import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList'
const KEY = 'AIzaSyBki6mlFvCAeCXgU_NHzxaUdpyi1cxUKwk';


class App extends React.Component {
    state = {
        videos: []
    }

    onTermSubmit = async inputSearch => {
        const response = await youtube.get('/search', {
            params: {
                key: KEY,
                part: 'snippet',
                q: inputSearch,
                maxResults: 5,
            }
        });

        this.setState({
            videos: response.data.items
        });
    };

    render() {

        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                I do have {this.state.videos.length} suggestion videos for you.!
                <VideoList videos={this.state.videos} />
            </div>
        )
    }
}
export default App;