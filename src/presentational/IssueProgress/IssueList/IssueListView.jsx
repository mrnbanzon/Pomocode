import React from 'react';
import Issue from './Issue/Issue';

const IssueListView = ({ plannedIssues, getPlannedIssues }) => (
  <div className="issue-list" style={{ height: '300px', overflow: 'auto', overflowX: 'hidden' }}>
    {plannedIssues.map(issue => (
      <Issue issue={issue} key={issue.git_id} getPlannedIssues={getPlannedIssues} />
    ))}
  </div>
);

export default IssueListView;
