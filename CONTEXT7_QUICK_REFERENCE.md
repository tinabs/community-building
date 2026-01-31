# Context7 MCP Server - Quick Reference

## Installation

```bash
npm install -g @upstash/context7-mcp
```

## Cursor Configuration

**Location**: `~/Library/Application Support/Cursor/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

**Configuration**:
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## Usage Examples

### React Documentation
```
@context7 query React hooks documentation for useState and useEffect
@context7 get React 18 documentation for server components
```

### Next.js Documentation
```
@context7 get Next.js App Router examples for server components
@context7 query Next.js 14 routing and metadata API
```

### Tailwind CSS
```
@context7 query Tailwind CSS utility classes for flexbox
@context7 get Tailwind responsive design breakpoints
```

### Supabase
```
@context7 get Supabase client setup for Next.js
@context7 query Supabase Row Level Security patterns
```

### Version-Specific Queries
```
@context7 get React 18.2 hooks documentation
@context7 query Next.js 14.1 App Router features
```

## Package Info

- **Package**: `@upstash/context7-mcp`
- **Version**: 2.1.1
- **NPM**: https://www.npmjs.com/package/@upstash/context7-mcp

## Troubleshooting

1. **Server not starting**: Check Node.js is in PATH
2. **API key issues**: Verify key in environment variables
3. **Configuration errors**: Validate JSON syntax
4. **Restart required**: Always restart Cursor after configuration changes
