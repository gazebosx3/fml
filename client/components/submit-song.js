import React from 'react'
import axios from 'axios'

export default class SubmitSong extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      artist: ''
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleArtistChange = this.handleArtistChange.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }
  handleArtistChange(event) {
    this.setState({artist: event.target.value})
  }

  handleSubmit(event) {
    if (!this.state.artist || !this.state.title) {
      alert('Make sure there are values for both title and artist')
    } else {
      const {artist, title} = this.state
      const body = {
        artist: this.state.artist.toUpperCase().trim(),
        title: this.state.title.toUpperCase().trim(),
        userId: this.props.id
      }
      axios
        .post('/songs/createSong', body)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </label>
        <label>
          Artist:
          <input
            type="text"
            value={this.state.artist}
            onChange={this.handleArtistChange}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    )
  }
}
