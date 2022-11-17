import React, { useEffect, useState } from 'react'
import { Card, Button, Tooltip, Dropdown } from 'components/ui'
import { Loading, TextEllipsis, UsersAvatarGroup } from 'components/shared'
import Confirmations  from './Confirmations'
import { getCategorizedArticles } from '../store/dataSlice'
import { 
	toggleArticleDeleteConfirmation, 
	toggleCategoryDeleteConfirmation,
	toggleCategoryRenameDialog, 
	setSelected 
} from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import { 
	HiChevronRight, 
	HiChevronDown, 
	HiOutlineTrash, 
	HiOutlinePencil,
	HiOutlineCog,
	HiOutlinePlus
} from 'react-icons/hi'


const CategorySection = ({data}) => {

	const dispatch = useDispatch()

	const [collapse, setCollapse] = useState(false)

	const navigate = useNavigate()

	const onCollapse = () => {
		setCollapse(!collapse)
	}

	const onArticleEdit = (id) => {
		navigate(`/app/knowledge-base/edit-article?id=${id}&categoryLabel=${data.label}&categoryValue=${data.value}`)
	}

	const onArticleAdd = () => {
		navigate(`/app/knowledge-base/edit-article?categoryLabel=${data.label}&categoryValue=${data.value}`)
	}

	const onArticleDelete = (id) => {
		dispatch(setSelected({id, categoryValue: data.value}))
		dispatch(toggleArticleDeleteConfirmation(true))
	}

	const onCategoryRename = () => {
		dispatch(setSelected({id: '', categoryValue: data.value}))
		dispatch(toggleCategoryRenameDialog(true))
	}

	const onCategoryDelete = () => {
		dispatch(setSelected({id: '', categoryValue: data.value}))
		dispatch(toggleCategoryDeleteConfirmation(true))
	}

	return (
		<div className="mb-6">
			<div className="flex items-center justify-between">
				<div 
					className="flex items-center gap-1 cursor-pointer select-none" 
					onClick={onCollapse}
				>
					<span className="text-lg">
						{collapse ? <HiChevronRight /> : <HiChevronDown />}
					</span>
					<h5>{data?.label}</h5>
					<span>({data?.articles?.length})</span>
				</div>
				<hr className="mx-3 w-full"/>
				<Dropdown 
					placement="bottom-end" 
					renderTitle={
						<Button 
							shape="circle" 
							variant="plain" 
							icon={<HiOutlineCog />} 
						/>
					}
				>
					<Dropdown.Item 
						eventKey="addArticle"
						onClick={() => onArticleAdd()}
					>
						Add article
					</Dropdown.Item>
					<Dropdown.Item 
						eventKey="rename"
						onClick={onCategoryRename}
					>
						Rename
					</Dropdown.Item>
					<Dropdown.Item 
						eventKey="delete"
						onClick={onCategoryDelete}
					>
						Delete
					</Dropdown.Item>
				</Dropdown>
			</div>
			<motion.div 
				className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4"
				initial={{ opacity: 0, height: 0, overflow: 'hidden' }} 
				animate={{ 
					opacity: collapse ? 0 : 1,
					height: collapse ? 0 : 'auto',
				}}
				transition={{ duration: 0.15 }}
			>
				{data.articles.length === 0 && (
					<Card
						onClick={() => onArticleAdd(data.label)}
						className="group border-dashed border-2 hover:border-indigo-600" 
						clickable
					>
						<div className="flex flex-col justify-center items-center py-5">
							<div className="p-4 border-2 border-dashed rounded-full border-gray-200 dark:border-gray-600 group-hover:border-indigo-600">
								<HiOutlinePlus className="text-4xl text-gray-200 dark:text-gray-600 group-hover:text-indigo-600" />
							</div>
							<p className="mt-5 font-semibold">Add article</p>
						</div>
					</Card>
				)} 
				{data?.articles?.map(article => (
					<Card bordered key={article.id}>
						<h6 className="truncate mb-4">
							{article.title}
						</h6>
						<div className="min-h-[60px]">
							<TextEllipsis text={article.content.replace(/<[^>]*>?/gm, '')} maxTextCount={120} />
						</div>
						<div className="flex items-center justify-between mt-4">
							<UsersAvatarGroup avatarProps={{size: 25}} users={article.authors || []} />
							<div className="flex">
								<Tooltip title="Delete">
									<Button 
										shape="circle" 
										variant="plain"
										size="sm" 
										onClick={() => onArticleDelete(article.id)}
										icon={<HiOutlineTrash />} 
									/>
								</Tooltip>
								<Tooltip title="Edit">
									<Button 
										shape="circle" 
										variant="plain" 
										size="sm"
										onClick={() => onArticleEdit(article.id)}
										icon={<HiOutlinePencil />} 
									/>
								</Tooltip>
							</div>
						</div>
					</Card>
				))}
			</motion.div>
		</div>
	)
}

const Articles = () => {

	const dispatch = useDispatch()

	const loading = useSelector((state) => state.knowledgeBaseManageArticles.data.loading)
	const categorizedArticles = useSelector((state) => state.knowledgeBaseManageArticles.data.categorizedArticles)

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	

	const fetchData = () => {
		dispatch(getCategorizedArticles())
	}

	return (
		<Loading loading={loading}>
			{categorizedArticles.map(cat => <CategorySection key={cat.value} data={cat} />)}
			<Confirmations data={categorizedArticles} />
		</Loading>
	)
}

export default Articles