## Brain (Synergy Wellness vault)

This project's tasks and reports live in the company brain, not in this repo. The
vault must be attached to this session as a second repository, usually at
`/home/user/vault`. If `/home/user/vault/.git` doesn't exist, don't write to the
brain — say "vault not attached to this session" in your final message.

Session start:

    python3 /home/user/vault/scripts/brain.py sync
    python3 /home/user/vault/scripts/brain.py inbox safari-smoke-drive

Session end (file a report, close what you finished):

    python3 /home/user/vault/scripts/brain.py report safari-smoke-drive --agent sites-agent \
      --headline "One line: what happened" --closes <task-id> --health green

This always pushes to vault `main`, even though this session's own repo works on a
`claude/` branch. See `/home/user/vault/CLAUDE.md` for the full contract and what an
exit code 3 means.
