// Importing icons
import AddLinkIcon from '@mui/icons-material/AddLink'
import ListIcon from '@mui/icons-material/List'
import PersonIcon from '@mui/icons-material/Person'
import PeopleIcon from '@mui/icons-material/People'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

// Components
import CollapsibleMenu from './CollapsibleMenu'
import Footer from './Footer'
import getItem from './Item'

type AppProps = {
  mode: 'full' | 'mini'
}

export function Sidebar({ mode }: AppProps) {
  return (
    <aside
      className="w-full h-full bg-gray-50 dark:bg-gray-800 flex justify-between flex-col min-h-0"
      aria-label="Sidebar"
    >
      <ul className="space-y-2 font-medium flex-grow w-full h-full px-2 py-4 overflow-y-auto">
        {getItem({
          mode,
          url: '/add-link',
          icon: <AddLinkIcon />,
          name: 'Add URL',
        })}

        {getItem({
          mode,
          url: '/links',
          icon: <ListIcon />,
          name: 'Links',
        })}

        {getItem({
          mode,
          url: '/profile',
          icon: <PersonIcon />,
          name: 'Profile',
        })}

        <CollapsibleMenu
          icon={AdminPanelSettingsIcon}
          title="Admin"
          mode={mode}
        >
          {getItem({
            mode,
            url: '/admin/links',
            icon: <ListIcon />,
            name: 'Links',
          })}
          {getItem({
            mode,
            url: '/admin/users',
            icon: <GroupAddIcon />,
            name: 'Users',
          })}
          {getItem({
            mode,
            url: '/admin/groups',
            icon: <PeopleIcon />,
            name: 'Groups',
          })}
        </CollapsibleMenu>
      </ul>

      <Footer mode={mode} />
    </aside>
  )
}

export default Sidebar
