import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme.context'
import './ThemeButton.css'

export function ThemeButton() {
	const { themeValue, switchTheme } = useContext(ThemeContext)

	return (
		<div
			className={`t-button-container flex  border-2 rounded-xl 
            ${themeValue === 'dark' ? 'border-white' : ''} 
            ${themeValue === 'light' ? 'border-black' : ''}`}
			onClick={switchTheme}
		>
			<img
				className={`t-button rounded-full 
            ${themeValue === 'dark' ? 'bg-white b-movement-dark' : ''} 
            ${themeValue === 'light' ? 'bg-black b-movement-light' : ''}`}
				src={
					themeValue === 'dark'
						? 'https://cdn2.vectorstock.com/i/1000x1000/54/91/moon-icon-line-night-symbol-vector-21085491.jpg'
						: 'https://as2.ftcdn.net/v2/jpg/03/15/80/15/1000_F_315801511_mnZ8Y8WBdqbyLuYNO0igvIKVZeaLxuLZ.jpg'
				}
			></img>
		</div>
	)
}
