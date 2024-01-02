import './HomeCarousel.css'
import Carousel from 'react-bootstrap/Carousel'

const images = [
	{
		image_url:
			'https://images.unsplash.com/photo-1671726203454-5d7a5370a9f4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		text: 'lalalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalalal',
	},
	{
		image_url:
			'https://images.unsplash.com/photo-1550921464-9f7a27f99edc?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		text: 'lalalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalalal',
	},
	{
		image_url:
			'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		text: 'lalalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalalal',
	},
	{
		image_url:
			'https://images.unsplash.com/photo-1698440050363-1697e5f0277c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		text: 'lalalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalalal',
	},
]

const HomeCarousel = () => {
	return (
		<Carousel fade className='main-carousel p-0 rounded-1'>
			{images.map((e) => {
				return (
					<Carousel.Item key={e}>
						<img src={e.image_url} alt='' />
						<Carousel.Caption className='carousel-text'>{e.text}</Carousel.Caption>
					</Carousel.Item>
				)
			})}
		</Carousel>
	)
}

export default HomeCarousel
