# hers-reskin

A Claude Code skill for reskinning live pages (Juniper first) into the Hims & Hers AU design system, pixel-perfect, using only Eucalyptus Storybook blocks, then capturing them into Figma via the Figma MCP and handing off to Contentful.

## Install

```bash
git clone git@github.com:ary4n/hers-reskin-skill.git ~/.claude/skills/hers-reskin
```

Then in Claude Code type `/hers-reskin` or just paste a myjuniper.com URL and say "reskin".

## Requirements
- Claude Code with the Figma MCP and claude-in-chrome connected (Chrome logged into the Eucalyptus Storybook and Contentful)
- Playwright in `~/Desktop/Lorikeet/browserbase-scratch` (or edit the path in `SKILL.md`)
- Python 3 with Pillow (`pip install pillow`)

## Layout
- `SKILL.md`: the process
- `references/design-tokens.md`: measured tokens and block anatomy
- `scripts/`: verify, capture-page builder, Figma capture, Storybook style dump

## Update
Edit the files in `~/.claude/skills/hers-reskin`, then `git commit` and `git push` from that folder.
