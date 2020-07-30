import { Layout, Typography, Carousel, Card } from "antd";

const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;

export default () => {
	return (
		<Layout>
			<Content id="homepage-content">
				<Title level={1} className="align-text-center">Yukiの秘密の花園へようこそ!</Title>
				<Carousel>
					<div className="carousel-slider">
						<Title level={3}>T O U R I S T&nbsp;&nbsp;&nbsp;G U I D E</Title>
						<p>23333</p>
					</div>
					<div className="carousel-slider">
						<Title level={3} className="title">N O T I C E&nbsp;&nbsp;&nbsp;T O&nbsp;&nbsp;&nbsp;T O U R I S T</Title>
					</div>
					<div className="carousel-slider">
						<Title level={3} className="title">F O R B I D D E N&nbsp;&nbsp;&nbsp;A R E A</Title>
					</div>
				</Carousel>
			</Content>
		</Layout>
	)
}