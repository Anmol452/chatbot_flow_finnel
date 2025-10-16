import './chat.css'

function Listtem(props:any) {
  return (
    <div className='boxList'>
      <small>{props.Listheader}</small>
        <div>{props.Listbody}</div>
      <small>{props.Listfooter}</small>

    </div>
  )
}

export default Listtem
