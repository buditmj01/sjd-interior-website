-- Add locale to projects (set to Indonesian 'id')
UPDATE projects SET locale = 'id' WHERE locale IS NULL;

-- Link projects to Indonesian locale in localizations table
INSERT OR IGNORE INTO projects_localizations_links (project_id, inv_project_id)
SELECT id, id FROM projects WHERE locale = 'id';
