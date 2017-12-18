export default () => {
  const { header, file } = this.props
  console.log(111)
  return (
    <div>
      <div className="header-container">
        { header }
      </div>
      <div className="file-container">
        { file }
      </div>
    </div>
  )
}