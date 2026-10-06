#!/usr/bin/env python3
"""Minimal Higgsfield API client. Credentials from the environment, never in the repo:
  HF_KEY or HIGGSFIELD_API_KEY = "KEY_ID:KEY_SECRET", or HIGGSFIELD_API_KEY_ID + HIGGSFIELD_API_KEY_SECRET.
usage: hf.py submit <model-id> <input.json>      -> prints the queue response (request_id, status_url)
       hf.py wait <status_url> [secs]            -> polls until terminal, prints the result json
       hf.py run <model-id> <input.json> [secs]  -> submit + wait
       hf.py upload <file> [content-type]       -> presigned upload, prints public_url
"""
import json, os, sys, time, urllib.request
def _key():
    for name in ("HF_KEY", "HIGGSFIELD_API_KEY", "HF_CREDENTIALS"):
        v = os.environ.get(name)
        if v and ":" in v: return v
    kid, sec = os.environ.get("HIGGSFIELD_API_KEY_ID"), os.environ.get("HIGGSFIELD_API_KEY_SECRET")
    if kid and sec: return f"{kid}:{sec}"
    if os.environ.get("HIGGSFIELD_API_KEY") and sec: return f"{os.environ['HIGGSFIELD_API_KEY']}:{sec}"
    sys.exit("No Higgsfield credentials: set HF_KEY=KEY_ID:KEY_SECRET, or HIGGSFIELD_API_KEY_ID and HIGGSFIELD_API_KEY_SECRET")
KEY = _key()
H = {"Authorization": f"Key {KEY}", "Content-Type": "application/json"}
def call(method, url, body=None):
    req = urllib.request.Request(url, method=method, data=json.dumps(body).encode() if body is not None else None, headers=H)
    try:
        with urllib.request.urlopen(req, timeout=120) as r: return json.load(r)
    except urllib.error.HTTPError as e:
        return {"http_error": e.code, "body": e.read().decode(errors="ignore")[:2000]}
def submit(model, body): return call("POST", f"https://api.higgsfield.ai/{model}", body)
def wait(status_url, secs=1800):
    deadline = time.time() + secs
    while True:
        j = call("GET", status_url)
        st = j.get("status")
        if st in ("completed", "failed", "nsfw", "canceled") or "http_error" in j: return j
        if time.time() > deadline: return {"timeout": True, "last": j}
        time.sleep(10)
def upload(path, content_type):
    u = call("POST", "https://api.higgsfield.ai/files/generate-upload-url", {"content_type": content_type})
    if "upload_url" not in u: return u
    data = open(path, "rb").read()
    hdrs = dict(u.get("upload_headers", {}))
    req = urllib.request.Request(u["upload_url"], method="PUT", data=data, headers=hdrs)
    with urllib.request.urlopen(req, timeout=300) as r: code = r.status
    return {"public_url": u["public_url"], "put_status": code}
cmd = sys.argv[1]
if cmd == "upload":
    print(json.dumps(upload(sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else "image/png")))
elif cmd == "submit":
    print(json.dumps(submit(sys.argv[2], json.load(open(sys.argv[3])))))
elif cmd == "wait":
    print(json.dumps(wait(sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 1800)))
elif cmd == "run":
    q = submit(sys.argv[2], json.load(open(sys.argv[3])))
    if "status_url" not in q: print(json.dumps(q)); sys.exit(1)
    r = wait(q["status_url"], int(sys.argv[4]) if len(sys.argv) > 4 else 1800)
    r["request_id"] = q.get("request_id"); print(json.dumps(r))
