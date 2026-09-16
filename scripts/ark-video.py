#!/usr/bin/env python3
"""Minimal BytePlus ModelArk (Seedance) client. Key from ARK_API_KEY.
usage: ark-video.py create <request.json>   -> prints task id
       ark-video.py get <task_id>            -> prints task json
       ark-video.py wait <task_id> [secs]    -> polls until terminal, prints json
"""
import json, os, sys, time, urllib.request
BASE = "https://ark.ap-southeast.bytepluses.com/api/v3/contents/generations/tasks"
KEY = os.environ["ARK_API_KEY"]
def call(method, url, body=None):
    req = urllib.request.Request(url, method=method, data=json.dumps(body).encode() if body else None,
        headers={"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r: return json.load(r)
    except urllib.error.HTTPError as e:
        return {"http_error": e.code, "body": e.read().decode(errors="ignore")}
cmd = sys.argv[1]
if cmd == "create":
    print(json.dumps(call("POST", BASE, json.load(open(sys.argv[2])))))
elif cmd == "get":
    print(json.dumps(call("GET", f"{BASE}/{sys.argv[2]}")))
elif cmd == "wait":
    deadline = time.time() + int(sys.argv[3] if len(sys.argv) > 3 else 1800)
    while True:
        j = call("GET", f"{BASE}/{sys.argv[2]}")
        st = j.get("status")
        if st in ("succeeded", "failed", "expired", "cancelled") or "http_error" in j:
            print(json.dumps(j)); break
        if time.time() > deadline: print(json.dumps({"timeout": True, "last": j})); break
        time.sleep(15)
