import "./header.css"
import blogger from '../../assets/blogger.jpeg'
function Header() {
  return (
<div className="header">
    <div className="headerTitles">
        <span className="headerTitleSm">Beekaas Ideas and thoughts</span>
        <span className="headerTitleLg"> Beekaa Blogs </span>
    </div>
    <img className="headerImg" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80" alt="background" />
    {/* <img className="headerImg" src={blogger} alt="background" /> */}
</div>
    )
}

export default Header