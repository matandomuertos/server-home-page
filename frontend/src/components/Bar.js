import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ServerIcon from '@mui/icons-material/Storage'
//import Box from '@mui/material/Box'
//import Button from '@mui/material/Button'


function Bar() {
	//const pages = ['About']

	return (
		<AppBar position="static">
			<Container maxWidth="100%">
				<Toolbar disableGutters>
					<ServerIcon sx={{ mr: 1 }} />
					<Typography
					variant="h6"
					noWrap
					component="a"
					href="/"
					sx={{
					mr: 2,
					fontFamily: "monospace",
					fontWeight: 700,
					letterSpacing: ".3rem",
					color: "inherit",
					textDecoration: "none"
					}}>
						KOKO
					</Typography>
{/*					<Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex", md: "flex" } }}>
						{pages.map((page) => (
							<Button
							key={page}
							sx={{ my: 2, color: "white", display: "block" }} >
								{page}
							</Button>
						))}
					</Box>*/}
				</Toolbar>
      		</Container>
		</AppBar>
	)
}

export default Bar