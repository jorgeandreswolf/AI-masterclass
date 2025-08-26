# Cursor Configuration

This directory contains Cursor IDE configuration files that link to the project's `CLAUDE.md` file for consistent AI context.

## Files

- **`rules/claude-context.md`**: Project rules that reference the CLAUDE.md file and establish consistent context for AI interactions
- **`settings.json`**: Workspace-specific Cursor settings that enable project rules and specify context files

## How it Works

1. **Project Rules**: The `rules/claude-context.md` file is automatically loaded by Cursor and provides persistent context for all AI interactions
2. **Context Files**: The settings specify which files should be included as context (`CLAUDE.md` and the rules file)
3. **Always Apply**: The rule is marked with `alwaysApply: true` to ensure it's used in every AI conversation

## Usage

Once these files are in place:
- Cursor will automatically reference the CLAUDE.md guidelines in AI conversations
- All code suggestions and completions will be informed by the project's best practices
- The AI will have consistent understanding of your project structure and requirements

## Customization

You can modify the `claude-context.md` file to add project-specific instructions or update the `settings.json` file to adjust Cursor's behavior for this workspace.

