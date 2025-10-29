import { Link } from 'react-router-dom'


interface Props {
  adminPageMenuItems: string[],
  adminPageId: number
}

export const AdminMenu = ({ adminPageMenuItems, adminPageId }: Props) => {

  const handleClasses = (index:number) => {
    let classes = "admin-menu-item";
    classes += index === adminPageId ? "-selected" : ""
    return classes
  }


  return (
    <div className="admin-menu" style={{paddingLeft:'5rem'}}>
      {adminPageMenuItems.map((menuItem, index) => (
        <Link
          key={index}
          to={`${menuItem.toLowerCase()}`}
          className={handleClasses(index)}
        >{menuItem}</Link>
      ))}
    </div>
  )
}
