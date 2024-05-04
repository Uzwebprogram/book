import { Box } from '@mui/material'
import Header from '../components/header/index'
import { LayoutProps } from './layout.props'

const Layout = ({ children, handleSearch }: LayoutProps) => {
    return (
        <>
            <Header handleSearch={handleSearch}/>
            <Box>{children}</Box>
        </>
    )
}

export default Layout