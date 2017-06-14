class Lesson extends Component {
  render() {
    const { lesson } = this.props
    return (
      <div onClick={() => console.log(`${this.props.index} - $lesson.title`)}>
        <h1>{lesson.title}</h1>
        <p>{lesson.description}</p>
      </div>
    )
  }
}

class LessonsList extends Component {
  render() {
    return (
      <div>
        {this.props.lessons.map((lesson, i) => { return <Lesson key={i} index={i} lesson={lesson} />})}
      </div>
    )
  }
} 
