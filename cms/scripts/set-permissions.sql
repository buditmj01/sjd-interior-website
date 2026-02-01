-- Set API permissions for Public role
-- Role ID 2 = Public

-- Projects permissions
INSERT OR IGNORE INTO up_permissions (action, subject, created_at, updated_at) VALUES
('plugin::content-manager.explorer.read', 'api::project.project', datetime('now'), datetime('now')),
('api::project.project.find', NULL, datetime('now'), datetime('now')),
('api::project.project.findOne', NULL, datetime('now'), datetime('now'));

-- Insights permissions  
INSERT OR IGNORE INTO up_permissions (action, subject, created_at, updated_at) VALUES
('plugin::content-manager.explorer.read', 'api::insight.insight', datetime('now'), datetime('now')),
('api::insight.insight.find', NULL, datetime('now'), datetime('now')),
('api::insight.insight.findOne', NULL, datetime('now'), datetime('now'));

-- Link permissions to Public role
INSERT OR IGNORE INTO up_permissions_role_links (permission_id, role_id) 
SELECT id, 2 FROM up_permissions 
WHERE action LIKE '%project%' OR action LIKE '%insight%';
