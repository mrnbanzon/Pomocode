import React from 'react';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <body>
        <h2>Calender</h2>
        <table>
          <tr>
            <th>Hour</th>
            <th>Planner</th> 
            <th>Interval Updates</th>
          </tr>
          <tr>
            <td>8am</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>9am</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>10am</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>11am</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>12pm</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>1pm</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2pm</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3pm</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>4pm</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>5pm</td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </body>
    );
  }
}

export default Calendar;
