-- Add API permissions for Public role (ID: 2)

-- Insert permissions
INSERT OR IGNORE INTO up_permissions (action, created_at, updated_at) VALUES
('api::project.project.find', datetime('now'), datetime('now')),
('api::project.project.findOne', datetime('now'), datetime('now')),
('api::insight.insight.find', datetime('now'), datetime('now')),
('api::insight.insight.findOne', datetime('now'), datetime('now'));

-- Link to public role
INSERT OR IGNORE INTO up_permissions_role_links (permission_id, role_id)
SELECT p.id, 2 
FROM up_permissions p
WHERE p.action IN (
    'api::project.project.find',
    'api::project.project.findOne',
    'api::insight.insight.find',
    'api::insight.insight.findOne'
);
