class MyComponent extends React.Component {
	constructor(props) {
       super(props);

       this.state = {
          data: 'Initial data...'
       };

       this.updateState = this.updateState.bind(this);

    }

    updateState(e) {
       this.setState({data: e.target.value});
    }

  render() {


	return <div> Hello world </div>;
  }
}
