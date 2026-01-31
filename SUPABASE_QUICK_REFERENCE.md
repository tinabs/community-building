# Supabase MCP Server - Quick Reference

## Installation ✅

```bash
npm install supabase-mcp
```

**Status**: Already installed in your project!

## Configuration

**File**: `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "supabase-mcp"],
      "env": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_KEY": "your-anon-key-here"
      }
    }
  }
}
```

## Get Your Credentials

1. Go to: https://app.supabase.com
2. Select your project
3. Settings → API
4. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Under "Project API keys"

## Usage Examples

### Query Data
```
@supabase query all users from the users table
@supabase get the first 10 posts ordered by created_at
@supabase find users where email contains '@gmail.com'
```

### SQL Queries
```
@supabase execute SQL: SELECT * FROM users WHERE created_at > NOW() - INTERVAL '7 days'
@supabase run query: SELECT COUNT(*) FROM posts WHERE published = true
```

### Schema Management
```
@supabase show me the schema for the users table
@supabase list all tables in my database
@supabase create a new table called 'comments'
```

### RLS Policies
```
@supabase show me all RLS policies for the users table
@supabase create an RLS policy that allows users to read their own data
```

### Debugging
```
@supabase help me debug this query
@supabase explain why this query is slow
@supabase optimize this SQL query
```

## Security Notes

- ✅ Use **anon key** for most operations (respects RLS)
- ⚠️ **service_role key** only for admin operations (keep secret!)
- 🔒 Always enable Row Level Security on sensitive tables

## Next Steps

1. Add your Supabase credentials to `.cursor/mcp.json`
2. Reload Cursor (`Cmd+Shift+P` → "Reload Window")
3. Test: `@supabase list all tables in my database`
