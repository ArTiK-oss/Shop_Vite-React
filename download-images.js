import fs from 'fs'
import path from 'path'
import https from 'https'

const dir1 = './public/images/products'
if (!fs.existsSync(dir1)) {
	fs.mkdirSync(dir1, { recursive: true })
}
const dir2 = './public/images/categories'
if (!fs.existsSync(dir2)) {
	fs.mkdirSync(dir2, { recursive: true })
}

const images = [
	{
		fileName: 'green-apple.png',
		url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'orange.png',
		url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'chinese-cabbage.png',
		url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'green-lettuce.png',
		url: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'eggplant.png',
		url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'potatoes.png',
		url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'corn.png',
		url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'cauliflower.png',
		url: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'green-capsicum.png',
		url: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'green-chili.png',
		url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'salmon.png',
		url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'chips.png',
		url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'cola.png',
		url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'body-wash.png',
		url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'bread.png',
		url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'cocoa.png',
		url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'cooking-oil.png',
		url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'oatmeal.png',
		url: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'detergent.png',
		url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'olive-oil.png',
		url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'strawberries.png',
		url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'avocado.png',
		url: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'green-tea.png',
		url: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'dark-chocolate.png',
		url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&auto=format&fit=crop',
	},
	{
		fileName: 'honey.png',
		url: 'https://images.unsplash.com/photo-1587049352847-4a222e784d33?w=400&auto=format&fit=crop',
	},
]

const categories = [
	{
		fileName: 'fruit.png',
		url: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&auto=format&fit=crop',
	},
	{
		fileName: 'vegetables.png',
		url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop',
	},
	{
		fileName: 'meat-fish.png',
		url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&auto=format&fit=crop',
	},
	{
		fileName: 'snacks.png',
		url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&auto=format&fit=crop',
	},
	{
		fileName: 'beverages.png',
		url: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=300&auto=format&fit=crop',
	},
	{
		fileName: 'beauty.png',
		url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop',
	},
	{
		fileName: 'bread.png',
		url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop',
	},
	{
		fileName: 'baking.png',
		url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&auto=format&fit=crop',
	},
	{
		fileName: 'cooking.png',
		url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300&auto=format&fit=crop',
	},
	{
		fileName: 'diabetic.png',
		url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300&auto=format&fit=crop',
	},
	{
		fileName: 'detergents.png',
		url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=300&auto=format&fit=crop',
	},
	{
		fileName: 'oil.png',
		url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop',
	},
]

const downloadImage = (url, filePath) => {
	return new Promise(resolve => {
		const options = {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
			},
		}

		https
			.get(url, options, response => {
				if ([301, 302, 307, 308].includes(response.statusCode)) {
					downloadImage(response.headers.location, filePath).then(resolve)
					return
				}

				if (response.statusCode !== 200) {
					console.error(
						`❌ Ошибка HTTP ${response.statusCode}: ${path.basename(filePath)}`,
					)
					resolve()
					return
				}

				const file = fs.createWriteStream(filePath)
				response.pipe(file)
				file.on('finish', () => {
					file.close()
					console.log(`✅ Скачано: ${path.basename(filePath)}`)
					resolve()
				})
			})
			.on('error', err => {
				console.error(
					`❌ Сетевая ошибка ${path.basename(filePath)}:`,
					err.message,
				)
				resolve()
			})
	})
}

async function start() {
	console.log('--- Скачивание товаров... ---')
	for (const item of images) {
		const filePath = path.join(dir1, item.fileName)
		await downloadImage(item.url, filePath)
	}

	console.log('--- Скачивание категорий... ---')
	for (const item of categories) {
		const filePath = path.join(dir2, item.fileName)
		await downloadImage(item.url, filePath)
	}

	console.log('✨ Всё успешно скачано!')
}

start()
