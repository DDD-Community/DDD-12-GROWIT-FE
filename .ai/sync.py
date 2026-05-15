#!/usr/bin/env python3
"""
.ai/ → .cursor/ + .claude/ 변환 스크립트 (SSOT sync)

Usage: python3 .ai/sync.py

- commands/*.md  → .cursor/commands/*.md, .claude/skills/{name}/SKILL.md
- rules/*.md     → .cursor/rules/{name}.mdc
- _meta.yaml 항목이 없는 파일은 에러로 실패 (silent skip 금지)
"""

from __future__ import annotations

import shutil
import sys
from pathlib import Path
from typing import Any

AI_DIR = Path(__file__).resolve().parent
ROOT_DIR = AI_DIR.parent
CURSOR_DIR = ROOT_DIR / ".cursor"
CLAUDE_DIR = ROOT_DIR / ".claude"

GREEN = "\033[0;32m"
BLUE = "\033[0;34m"
RED = "\033[0;31m"
NC = "\033[0m"


def log(msg: str) -> None:
    print(f"{GREEN}[sync]{NC} {msg}")


def info(msg: str) -> None:
    print(f"{BLUE}[info]{NC} {msg}")


def die(msg: str) -> None:
    print(f"{RED}[error]{NC} {msg}", file=sys.stderr)
    sys.exit(1)


# ---------- Minimal YAML parser (no PyYAML dependency) ----------

def parse_yaml(text: str) -> dict[str, Any]:
    root: dict[str, Any] = {}
    stack: list[tuple[int, dict[str, Any]]] = [(-1, root)]

    for raw_lineno, raw_line in enumerate(text.splitlines(), start=1):
        line = raw_line.rstrip()
        if not line or line.lstrip().startswith("#"):
            continue

        indent = len(line) - len(line.lstrip(" "))
        if indent % 2 != 0:
            die(f"sync.py: YAML indent must be multiples of 2 (line {raw_lineno}): {raw_line!r}")

        content = line.lstrip(" ")
        if ":" not in content:
            die(f"sync.py: YAML line missing ':' (line {raw_lineno}): {raw_line!r}")

        key, _, value = content.partition(":")
        key = key.strip()
        value = value.strip()

        while stack and stack[-1][0] >= indent:
            stack.pop()
        if not stack:
            die(f"sync.py: broken YAML indentation (line {raw_lineno})")

        parent = stack[-1][1]

        if value == "":
            new_map: dict[str, Any] = {}
            parent[key] = new_map
            stack.append((indent, new_map))
        else:
            parent[key] = _coerce(value)

    return root


def _coerce(v: str) -> Any:
    if len(v) >= 2 and v[0] == v[-1] and v[0] in ("'", '"'):
        return v[1:-1]
    if v.lower() == "true":
        return True
    if v.lower() == "false":
        return False
    if v.isdigit():
        return int(v)
    return v


def load_meta(path: Path) -> dict[str, Any]:
    if not path.exists():
        die(f"{path} not found")
    return parse_yaml(path.read_text(encoding="utf-8"))


# ---------- Sync steps ----------

def cleanup_stale() -> None:
    log("Cleaning output directories...")
    for target in (CURSOR_DIR / "commands", CURSOR_DIR / "rules", CLAUDE_DIR / "skills"):
        if target.exists():
            shutil.rmtree(target)
    log("  → cleaned .cursor/commands/, .cursor/rules/, .claude/skills/")


def sync_cursor_commands() -> None:
    log("Commands → .cursor/commands/")
    out_dir = CURSOR_DIR / "commands"
    out_dir.mkdir(parents=True, exist_ok=True)
    count = 0
    for md in sorted((AI_DIR / "commands").glob("*.md")):
        shutil.copy2(md, out_dir / md.name)
        info(f"  {md.name}")
        count += 1
    log(f"  → {count} command(s) synced")


def sync_claude_skills() -> None:
    log("Commands → .claude/skills/")
    meta = load_meta(AI_DIR / "commands" / "_meta.yaml")
    count = 0
    for md in sorted((AI_DIR / "commands").glob("*.md")):
        name = md.stem
        entry = meta.get(name)
        if not isinstance(entry, dict):
            die(f"commands/_meta.yaml: '{name}' entry missing or not a mapping")

        description = entry.get("description")
        if not description:
            die(f"commands/_meta.yaml: '{name}.description' is required")

        claude_cfg = entry.get("claude") or {}
        allowed_tools = claude_cfg.get("allowed-tools") if isinstance(claude_cfg, dict) else None
        context = claude_cfg.get("context") if isinstance(claude_cfg, dict) else None

        skill_dir = CLAUDE_DIR / "skills" / name
        skill_dir.mkdir(parents=True, exist_ok=True)

        front = ["---", f"name: {name}", f"description: {description}"]
        if context:
            front.append(f"context: {context}")
        if allowed_tools:
            front.append(f"allowed-tools: {allowed_tools}")
        front.append("---")
        front.append("")

        body = md.read_text(encoding="utf-8")
        (skill_dir / "SKILL.md").write_text("\n".join(front) + body, encoding="utf-8")
        info(f"  {name}/SKILL.md")
        count += 1
    log(f"  → {count} skill(s) synced")


def sync_cursor_rules() -> None:
    log("Rules → .cursor/rules/")
    out_dir = CURSOR_DIR / "rules"
    out_dir.mkdir(parents=True, exist_ok=True)
    meta = load_meta(AI_DIR / "rules" / "_meta.yaml")
    count = 0
    for md in sorted((AI_DIR / "rules").glob("*.md")):
        name = md.stem
        entry = meta.get(name)
        if not isinstance(entry, dict):
            die(f"rules/_meta.yaml: '{name}' entry missing or not a mapping")

        description = entry.get("description")
        if not description:
            die(f"rules/_meta.yaml: '{name}.description' is required")

        cursor_cfg = entry.get("cursor") or {}
        globs = cursor_cfg.get("globs") if isinstance(cursor_cfg, dict) else None
        always_apply = cursor_cfg.get("alwaysApply") if isinstance(cursor_cfg, dict) else None

        front = ["---", f"description: {description}"]
        if globs:
            front.append(f"globs: {globs}")
        if always_apply is not None:
            front.append(f"alwaysApply: {str(always_apply).lower()}")
        front.append("---")
        front.append("")

        body = md.read_text(encoding="utf-8")
        (out_dir / f"{name}.mdc").write_text("\n".join(front) + body, encoding="utf-8")
        info(f"  {name}.mdc")
        count += 1
    log(f"  → {count} rule(s) synced")


def main() -> None:
    print()
    print("=========================================")
    print("  DDD-12-GROWIT-LEAD AI Command SSOT Sync")
    print("  .ai/ → .cursor/ + .claude/skills/")
    print("=========================================")
    print()
    cleanup_stale()
    print()
    sync_cursor_commands()
    print()
    sync_claude_skills()
    print()
    sync_cursor_rules()
    print()
    print("=========================================")
    log("Sync complete!")
    print("=========================================")


if __name__ == "__main__":
    main()
