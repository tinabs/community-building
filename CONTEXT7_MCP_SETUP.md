# Context7 MCP Server Setup Guide for Cursor

## 1. Installation

### Step 1: Install Context7 MCP Server

The official Context7 MCP server package is `@upstash/context7-mcp`. Install it:

```bash
# Global installation (recommended for MCP servers)
npm install -g @upstash/context7-mcp

# Or local installation
npm install @upstash/context7-mcp
```

**Note**: You may also need the Context7 CLI for API key setup:
```bash
npm install -g context7
```

### Step 2: Verify Installation

Check if the package is installed correctly:

```bash
# Check npm packages
npm list -g @upstash/context7-mcp

# Verify the package exists
npm info @upstash/context7-mcp
```

## 2. Configuration in Cursor

### Step 1: Locate Cursor Settings

Cursor stores MCP server configurations in a settings file. The location depends on your OS:

**macOS:**
```
~/Library/Application Support/Cursor/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json
```

**Windows:**
```
%APPDATA%\Cursor\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json
```

**Linux:**
```
~/.config/Cursor/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json
```

### Step 2: Configure MCP Server

Open or create the MCP settings file and add the Context7 configuration:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": [
        "-y",
        "@upstash/context7-mcp"
      ],
      "env": {
        "CONTEXT7_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

**Alternative Configuration (if using global install):**

```json
{
  "mcpServers": {
    "context7": {
      "command": "node",
      "args": [
        "/usr/local/lib/node_modules/@upstash/context7-mcp/dist/index.js"
      ],
      "env": {
        "CONTEXT7_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

**Note**: Replace `/usr/local/lib/node_modules/` with your actual global node_modules path. Find it with:
```bash
npm root -g
```

**Using Local Installation (Recommended if global install has permission issues):**

If you installed the package locally in your project (as we just did), use the absolute path:

```json
{
  "mcpServers": {
    "context7": {
      "command": "node",
      "args": [
        "/Users/tinbousa/development/Community-Building/node_modules/@upstash/context7-mcp/dist/index.js"
      ],
      "env": {
        "CONTEXT7_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

**To find your exact local path**, run this in your project directory:
```bash
cd /path/to/your/project
echo "$(pwd)/node_modules/@upstash/context7-mcp/dist/index.js"
```

**Or use npx (Simplest - works with both local and global):**

The `npx` approach is the simplest and works whether the package is installed locally or globally:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": [
        "-y",
        "@upstash/context7-mcp"
      ],
      "env": {
        "CONTEXT7_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Step 3: Restart Cursor

After configuring, restart Cursor completely to load the MCP server.

## 3. Usage

### Querying Documentation

Once configured, you can query documentation in Cursor's chat interface:

#### React Hooks Documentation

```
@context7 query React hooks documentation for useState and useEffect
```

#### Next.js App Router Examples

```
@context7 get Next.js App Router examples for server components and routing
```

#### Tailwind CSS Utilities

```
@context7 query Tailwind CSS utility classes for flexbox and grid layouts
```

### Best Practices

1. **Be Specific**: Include library names and versions in queries
   ```
   @context7 query React 18 hooks documentation
   ```

2. **Version-Specific Queries**: Specify versions when needed
   ```
   @context7 get Next.js 14 App Router documentation
   ```

3. **Context-Aware Queries**: Reference your current code
   ```
   @context7 how to use Supabase client-side authentication in Next.js App Router
   ```

4. **Multiple Libraries**: Query multiple libraries in one request
   ```
   @context7 compare React Query vs SWR for data fetching in Next.js
   ```

## 4. Examples

### Example 1: Fetch React Hooks Documentation

**Query:**
```
@context7 get documentation for React hooks: useState, useEffect, useContext, and useReducer with examples
```

**Expected Response:**
- Hook signatures
- Usage examples
- Best practices
- Common patterns

### Example 2: Next.js App Router Examples

**Query:**
```
@context7 show me Next.js App Router examples for:
- Server components
- Client components
- Route handlers
- Metadata API
```

**Expected Response:**
- Code examples for each feature
- When to use each pattern
- Migration guides from Pages Router

### Example 3: Query Tailwind CSS Utility Classes

**Query:**
```
@context7 query Tailwind CSS utilities for:
- Responsive design (breakpoints)
- Flexbox layouts
- Grid layouts
- Spacing utilities
```

**Expected Response:**
- Utility class names
- Responsive variants
- Usage examples
- Customization options

### Example 4: Supabase Integration

**Query:**
```
@context7 get Supabase documentation for:
- Client setup in Next.js
- Row Level Security (RLS)
- Real-time subscriptions
- Authentication patterns
```

## 5. Troubleshooting

### Server Not Starting

1. **Check Node.js Path**: Ensure Node.js is in your PATH
   ```bash
   which node
   which npm
   ```

2. **Verify Package Installation**: 
   ```bash
   npm list -g @context7/mcp-server
   ```

3. **Check Cursor Logs**: 
   - Open Cursor
   - Go to Help → Toggle Developer Tools
   - Check Console for MCP errors

### Configuration Errors

1. **JSON Syntax**: Ensure your JSON is valid
   ```bash
   # Validate JSON
   cat ~/Library/Application\ Support/Cursor/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json | python -m json.tool
   ```

2. **Path Issues**: Use absolute paths or ensure commands are in PATH

3. **Permissions**: Ensure the MCP server executable has proper permissions

### API Key Issues

1. **Environment Variables**: Verify the API key is set correctly
2. **Key Format**: Ensure no extra spaces or quotes in the API key
3. **Key Validity**: Verify the API key is active and has proper permissions

## 6. Advanced Configuration

### Multiple MCP Servers

You can configure multiple MCP servers:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": "your-api-key"
      }
    },
    "other-mcp-server": {
      "command": "other-command",
      "args": []
    }
  }
}
```

### Custom Environment Variables

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": "your-api-key",
        "CONTEXT7_CACHE_DIR": "/path/to/cache",
        "CONTEXT7_LOG_LEVEL": "debug"
      }
    }
  }
}
```

### Getting Your Context7 API Key

1. Visit [Context7](https://context7.com) or the Upstash Console
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your MCP configuration

## 7. Verification

### Test the Connection

1. Open Cursor
2. Open the chat/command palette
3. Try a simple query:
   ```
   @context7 query React documentation
   ```

### Check MCP Server Status

In Cursor's developer console, you should see:
- MCP server connection status
- Available tools/resources
- Any error messages

## 8. Additional Resources

- **Context7 MCP Package**: [@upstash/context7-mcp on npm](https://www.npmjs.com/package/@upstash/context7-mcp)
- **Context7 SDK**: [@upstash/context7-sdk](https://www.npmjs.com/package/@upstash/context7-sdk)
- **Context7 CLI**: [context7 on npm](https://www.npmjs.com/package/context7)
- **MCP Protocol**: Learn about Model Context Protocol at [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **Cursor MCP Docs**: Check Cursor's documentation for MCP server support
- **Upstash**: Context7 is part of the Upstash ecosystem - check [upstash.com](https://upstash.com) for more information

---

## Quick Start Summary

1. **Install**: `npm install -g @upstash/context7-mcp`
2. **Get API Key**: Sign up at Context7/Upstash and get your API key
3. **Configure**: Add to Cursor's MCP settings file (see Step 2 above)
4. **Restart**: Restart Cursor completely
5. **Use**: Query documentation with `@context7` in Cursor's chat

**Package Details:**
- Package: `@upstash/context7-mcp`
- Version: 2.1.1 (as of 2026-01-29)
- Maintained by: Upstash team
