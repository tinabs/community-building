# Supabase MCP Server Setup Guide for Cursor

## 1. Installation & Setup

### Step 1: Install Supabase MCP Server

The package has been installed locally in your project:

```bash
npm install supabase-mcp
```

**Package Details:**
- Package: `supabase-mcp`
- Version: 1.5.0
- NPM: https://www.npmjs.com/package/supabase-mcp
- GitHub: https://github.com/Cappahccino/SB-MCP

### Step 2: Get Your Supabase Credentials

To authenticate with your Supabase project, you need:

1. **Supabase Project URL**
   - Go to your Supabase project dashboard: https://app.supabase.com
   - Navigate to **Settings** → **API**
   - Copy your **Project URL** (e.g., `https://xxxxx.supabase.co`)

2. **Supabase API Key**
   - In the same API settings page
   - You have two options:
     - **anon/public key**: For client-side operations (recommended for most use cases)
     - **service_role key**: For admin operations (use with caution, has full access)

**Security Note:**
- Use the **anon key** for most operations (it respects Row Level Security policies)
- Only use the **service_role key** if you need to bypass RLS (not recommended for production)

### Step 3: Configure in Cursor

The Supabase MCP server requires these environment variables:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Your Supabase API key (anon or service_role)

## 2. Configuration

### Update `.cursor/mcp.json`

Add the Supabase MCP server configuration to your existing MCP settings:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": "ctx7sk-77aebb25-c26b-4116-8648-f126c915d323"
      }
    },
    "supabase": {
      "command": "npx",
      "args": ["-y", "supabase-mcp"],
      "env": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_KEY": "your-anon-or-service-role-key"
      }
    }
  }
}
```

**Important:** Replace the placeholder values with your actual Supabase credentials.

## 3. Features

The Supabase MCP server provides the following capabilities:

### Database Operations
- **Query Tables**: Query data from your database tables
- **CRUD Operations**: Create, Read, Update, Delete records
- **SQL Queries**: Execute custom SQL queries
- **Schema Management**: View and manage database schema
- **Migrations**: Create and apply database migrations

### Security
- **Row Level Security (RLS)**: View and manage RLS policies
- **Authentication**: Access Supabase auth features
- **API Keys**: Manage API keys securely

### Documentation
- **Supabase Docs**: Access Supabase documentation
- **Examples**: Get code examples for common operations
- **Best Practices**: Learn Supabase best practices

## 4. Usage Examples

### Query Data from Tables

```
@supabase query all users from the users table
@supabase get the first 10 posts ordered by created_at
@supabase find users where email contains '@gmail.com'
```

### Execute SQL Queries

```
@supabase execute SQL: SELECT * FROM users WHERE created_at > NOW() - INTERVAL '7 days'
@supabase run query: SELECT COUNT(*) FROM posts WHERE published = true
```

### View Database Schema

```
@supabase show me the schema for the users table
@supabase list all tables in my database
@supabase describe the posts table structure
```

### Create and Modify Schemas

```
@supabase create a new table called 'comments' with columns: id, post_id, user_id, content, created_at
@supabase add a column 'updated_at' to the posts table
@supabase create an index on the users table email column
```

### Row Level Security (RLS) Policies

```
@supabase show me all RLS policies for the users table
@supabase create an RLS policy that allows users to read their own data
@supabase help me set up RLS for the posts table
```

### Debug Database Queries

```
@supabase help me debug this query: SELECT * FROM users WHERE...
@supabase explain why this query is slow
@supabase optimize this SQL query
```

## 5. Authentication Setup

### Getting Your Credentials

1. **Log in to Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Sign in or create an account

2. **Select or Create a Project**
   - Choose your project from the dashboard
   - Or create a new project

3. **Navigate to API Settings**
   - Click on **Settings** (gear icon) in the left sidebar
   - Select **API** from the settings menu

4. **Copy Your Credentials**
   - **Project URL**: Found under "Project URL"
     - Format: `https://xxxxx.supabase.co`
   - **anon public key**: Found under "Project API keys" → "anon public"
   - **service_role key**: Found under "Project API keys" → "service_role" (⚠️ Keep this secret!)

### Security Best Practices

1. **Use anon key for most operations**
   - The anon key respects Row Level Security policies
   - Safe to use in client-side code (with RLS enabled)

2. **Protect service_role key**
   - Never expose in client-side code
   - Only use for server-side admin operations
   - Consider using environment variables

3. **Enable Row Level Security**
   - Always enable RLS on sensitive tables
   - Create policies that match your security requirements

## 6. Complete Configuration Example

Here's a complete example of the `.cursor/mcp.json` file with both Context7 and Supabase:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": "ctx7sk-77aebb25-c26b-4116-8648-f126c915d323"
      }
    },
    "supabase": {
      "command": "npx",
      "args": ["-y", "supabase-mcp"],
      "env": {
        "SUPABASE_URL": "https://your-project-id.supabase.co",
        "SUPABASE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  }
}
```

## 7. Troubleshooting

### MCP Server Not Appearing

1. **Reload Cursor**: Press `Cmd+Shift+P` → "Reload Window"
2. **Check JSON Syntax**: Ensure your `.cursor/mcp.json` is valid JSON
3. **Verify Package**: Check that `supabase-mcp` is installed:
   ```bash
   npm list supabase-mcp
   ```

### Authentication Errors

1. **Check Credentials**: Verify your SUPABASE_URL and SUPABASE_KEY are correct
2. **Key Type**: Ensure you're using the correct key type (anon vs service_role)
3. **Project Status**: Verify your Supabase project is active and not paused

### Connection Issues

1. **Network**: Ensure you can access your Supabase project URL
2. **Firewall**: Check if any firewall is blocking the connection
3. **Project Status**: Verify the project is not paused or deleted

## 8. Next Steps

After configuration:

1. **Reload Cursor** completely
2. **Verify MCP Server** appears in the "Installed MCP Servers" panel
3. **Test Connection** by querying a simple table:
   ```
   @supabase list all tables in my database
   ```

## 9. Additional Resources

- **Supabase Documentation**: https://supabase.com/docs
- **Supabase MCP Package**: https://www.npmjs.com/package/supabase-mcp
- **Supabase GitHub**: https://github.com/supabase/supabase
- **MCP Protocol**: https://modelcontextprotocol.io

---

**Ready to configure?** Provide your Supabase URL and API key, and I'll add it to your configuration file!
