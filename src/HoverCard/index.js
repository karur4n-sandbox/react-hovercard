import React from 'react'

export default class HoverCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayChildren: false,
      isForPc: false,
    }
  }
  componentDidMount() {
    window.addEventListener('resize', () => this.setTargetDevice())
    this.setTargetDevice()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => this.setTargetDevice())
  }
  setTargetDevice() {
    console.log('ua')
    if (window.innerWidth > 540) {
      this.setState({
        isForPc: true
      })
    } else {
      this.setState({
        isForPc: false
      })
    }
  }
  handleOnMouseEnter() {
    if (!this.state.isForPc) return

    this.setState({
      displayChildren: true
    })
  }
  handleOnMouseLeave() {
    if (!this.state.isForPc) return

    this.setState({
      displayChildren: false
    })
  }
  handleOnClick() {
    if (this.state.isForPc) return

    console.log('hoge')

    this.setState({
      displayChildren: true
    })
  }
  handleOnCloseModal() {
    this.setState({
      displayChildren: false
    })
  }
  renderInnerComponent() {
    if (this.state.isForPc) {
      return (
        <HoverInnerForPc>
          {this.props.displayComponentWhenHovered}
        </HoverInnerForPc>
      )
    } else {
      return (
        <HoverInnerForSp handleClose={() => this.handleOnCloseModal()}>
          {this.props.displayComponentWhenHovered}
        </HoverInnerForSp>
      )
    }
  }
  render() {
    console.log(this.state)
    return (
      <div
        onMouseEnter={() => this.handleOnMouseEnter()}
        onMouseLeave={() => this.handleOnMouseLeave()}
        onClick={() => this.handleOnClick()}
      >
        {this.props.children}
        {this.state.displayChildren &&
          this.renderInnerComponent()
        }
      </div>
    )
  }
}

const HoverInnerForPc = ({ children }) => {
  return (
    <div className='hover-container'>
      <div className="hover-card">
        {children}
      </div>
    </div>
  )
}

class HoverInnerForSp extends React.Component {
  handleClickOutside(e) {
    this.props.handleClose()
    e.stopPropagation()
  }
  handleClickModal(e) {
    e.stopPropagation()
  }
  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }
  render() {
    return (
      <div
        className="modal-background"
        onClick={(e) => this.handleClickOutside(e)}
      >
        <div
          className="modal-inner"
          onClick={(e) => this.handleClickModal(e)}
        >
          {this.props.children}
          </div>
      </div>
    )
  }
}