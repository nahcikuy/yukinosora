import { Layout, Typography, Carousel, Card } from "antd";

const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;

export async function getStaticProps() {
	return {
		props: {
			title: 'Yukiの秘密の花園へようこそ'
		}
	};
}

export default () => {
	return (
		<Layout>
			<Content id="homepage-content">
				<Title level={1} className="align-text-center">Yukiの秘密の花園へようこそ!</Title>
				<Carousel>
					<div className="carousel-slider">
						<Title level={3}>T O U R I S T&nbsp;&nbsp;&nbsp;G U I D E</Title>
						<div className="card-group">
							<Card title="Archieves Hall" className="card">
								<p>档案管里封存着Yuki日常记录的点点滴滴。</p>
								<a href="/blog/all">Go now!</a>
							</Card>
							<Card title="Information Center" className="card">
								<p>要了解更多关于Yuki的信息吗？</p>
								<p>前往信息中心了解关于Yuki的一切！</p>
								<a href="/profile">Go now!</a>
							</Card>
							<Card title="Terminal" className="card">
								<p>终端给予了你和Yuki直接交互的能力！（此功能仍在开发中）</p>
								<p className="delete-line">警告：禁止调戏Yuki</p>
								<p className="delete-line">您的所作所为都将被记录在案</p>
								<p className="delete-line">关爱智障少女，人人有责</p>
								<a href="/terminal">Go now!</a>
							</Card>
						</div>

					</div>

					<div className="carousel-slider">
						<Title level={3} className="title">N O T I C E&nbsp;&nbsp;&nbsp;T O&nbsp;&nbsp;&nbsp;T O U R I S T</Title>
						<div className="card-group">
							<Card title="Opening Time" className="card">
								<p>本园24小时免费开放。</p>
								<p>您可以在任意时刻来访，</p>
								<p className="delete-line">并尽情地释放自我</p>
							</Card>
							<Card title="Authentication" className="card">
								<p>您可以自由修改、转发这里的所有内容。</p>
								<p>唯一的限制是转载时请务必注明出处。</p>
							</Card>
							<Card title="Adoption" className="card">
								<p className="delete-line">领养Yuki以获得<span class="italic">禁忌领域</span>的访问权限</p>
								<p className="delete-line">并和她一起开始美好的生活</p>
								<p className="delete-line">领养指南请在信息中心予以确认</p>
							</Card>
						</div>
					</div>

					<div className="carousel-slider">
						<Title level={3} className="title">F O R B I D D E N&nbsp;&nbsp;&nbsp;A R E A</Title>
						<div className="card-group">
							<Card title="Under Construction" className="card">
								<p>敬请期待</p>
							</Card>
							<Card title="Under Construction" className="card">
								<p>敬请期待</p>
							</Card>
							<Card title="Under Construction" className="card">
								<p>敬请期待</p>
							</Card>
						</div>
					</div>
				</Carousel>
			</Content>
		</Layout >
	)
}