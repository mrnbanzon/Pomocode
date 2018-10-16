import React from 'react';
import IntervalIssueView from './Interval/IntervalIssueView';
import MainChart from '../MainChart/MainChart';

const IntervalUpdatesView = ({
 user, intervals, analysisInfo, getAnalysis 
}) => (
  <div className="interval-updates-container">
    <div className="interval-list-container">
      <h3>Interval Updates</h3>
      <div style={{ height: '300px', overflow: 'auto', overflowX: 'hidden' }}>
        {intervals.map((intervalObj) => {
          const interval = Object.values(intervalObj);
          return (
            <div className="interval" key={interval[0].intervalNum}>
              <span onClick={() => getAnalysis('Interval', interval[0].intervalNum)}>
                {`Interval #${interval[0].intervalNum}`}
              </span>
              {interval[0].issues.map(issue => (
                <IntervalIssueView
                  key={issue.title.toString()}
                  issue={issue}
                  getAnalysis={getAnalysis}
                />
              ))}
            </div>);
        })}
      </div>
    </div>
    <div className="analysis-container">
      <MainChart analysisInfo={analysisInfo} user={user} />
    </div>
  </div>
);

export default IntervalUpdatesView;
