import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useRef, useState } from 'react';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Text } from 'components/text';
import { Separator } from 'components/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useClose } from './hooks/UseClose';

type ArticleParamsFormProps = {
	state: ArticleStateType;
	onChange: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	state,
	onChange,
}: ArticleParamsFormProps) => {
	const [ArticleState, setArticleState] = useState(state);
	const [isActive, setIsActive] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	
	useClose({
		isOpen: isActive,
		onClose: () => setIsActive(false),
		rootRef: formRef
	})

	const formOpen = () => {
		setIsActive((prevState) => !prevState);
	};

	const formSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		onChange(ArticleState);
	};

	const formReset = () => {
		setArticleState(defaultArticleState);
		onChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={formOpen} isOpen={isActive} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isActive,
				})}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={formSubmit}
					onClick={(evt) => evt.stopPropagation()}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={ArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={(value) => {
							setArticleState({
								...ArticleState,
								fontFamilyOption: value,
							});
						}}
					/>
					<RadioGroup
						selected={ArticleState.fontSizeOption}
						options={fontSizeOptions}
						title={'Размер шрифта'}
						name={'Размер шрифта'}
						onChange={(value) => {
							setArticleState({
								...ArticleState,
								fontSizeOption: value,
							});
						}}
					/>
					<Select
						selected={ArticleState.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={(value) => {
							setArticleState({
								...ArticleState,
								fontColor: value,
							});
						}}
					/>
					<Separator />
					<Select
						selected={ArticleState.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={(value) => {
							setArticleState({
								...ArticleState,
								backgroundColor: value,
							});
						}}
					/>
					<Select
						selected={ArticleState.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={(value) => {
							setArticleState({
								...ArticleState,
								contentWidth: value,
							});
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={formReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
