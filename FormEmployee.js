
import React, {Component} from 'react';


class FormEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            poster: '',
            comment: '',
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        if (!this.state.name || !this.state.poster || !this.state.comment ) {
            alert('Please fill the form and click again');
            event.preventDefault();
        } else {
            // FETCH -> Post
            event.preventDefault();
            fetch('http://campus-bordeaux.ovh:3001/api/quests/movies/', {
                method: 'post',
                body: JSON.stringify(this.state)
            })
                .then(response => response.json())
                .then(data => {alert(`Movie name :  
                
                
                ${JSON.stringify(data)}`)

                    this.setState({
                        name: '',
                        poster: '',
                        comment: '',
                    });


                });
        }
    }
    state = {
        movies: []
    };

    componentDidMount() {
        fetch("http://campus-bordeaux.ovh:3001/api/quests/movies/")
            .then(
                response => response.json())
            .then(data => this.setState({ movies: data.filter((m, i, a) => i > a.length - 5 ) }));
    }


    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }


    render() {
        return (
            <div className="pa4 black-80">
                <h1 className="tc f2 dark-pink"> Your favorite movie? </h1>
                <form onSubmit={this.handleSubmit} className="measure center">
                    <fieldset className="ba b--transparent ph0 mh0 avenir">
                        <legend className="tc f4 fw6 ph0 mh0">Fill the form</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Movie name:</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                id="name"
                                name="name"
                                onChange={this.onChange}
                                value={this.state.name}
                            />
                        </div>

                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="poster">Poster url:</label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="url"
                                id="poster"
                                name="poster"
                                placeholder="http://"
                                onChange={this.onChange}
                                value={this.state.poster}
                            />
                        </div>

                        <div className="mv3">
                            <label className="db fw6 lh-copy f6"  htmlFor="comment">Favorite thing about movie: </label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                id="comment"
                                name="comment"
                                onChange={this.onChange}
                                value={this.state.comment}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <input  className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib hot-pink" type="submit" value="Done" />
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default FormEmployee;