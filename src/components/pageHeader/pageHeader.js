

export const PageHeaderComp = (props) => {
    
  let styles = {
      color: "#276AFF",
      fontWeight: "800"
  }
  return (
     <>
      <h2 className="site-page-header" style={props.style ? props.style : styles}>
          {props.title}
      </h2>
     </> 
  )
}