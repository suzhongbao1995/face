import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import style from './index.less';

interface Props {
  id?: number;
}
interface State {
  id: number;
}

@connect((state) => state)
class Home extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <div className={style.red}>
        <div>2222</div>
        <Button type="primary">Primary Button</Button>
      </div>
    );
  }
}

export default Home;
