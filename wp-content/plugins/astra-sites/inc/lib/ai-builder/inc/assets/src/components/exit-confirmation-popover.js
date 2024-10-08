import { useState } from '@wordpress/element';
import Tippy from '@tippyjs/react/headless';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSpring, motion } from 'framer-motion';
import Button from './button';
import { __ } from '@wordpress/i18n';
import { classNames } from '../utils/helpers';

const ExitConfirmationPopover = ( {
	onExit,
	placement = 'auto',
	exitButtonClassName = '',
} ) => {
	const [ show, setShow ] = useState( false );
	const springConfig = { damping: 30, stiffness: 300 };
	const initialOpacity = 0;
	const opacity = useSpring( initialOpacity, springConfig );

	const toggleShow = () => {
		setShow( ( prev ) => ! prev );
	};

	const onMount = () => {
		opacity.set( 1 );
	};

	const onHide = () => {
		opacity.set( 0 );
	};

	return (
		<Tippy
			visible={ show }
			onClickOutside={ toggleShow }
			onMount={ onMount }
			onHide={ onHide }
			render={ ( attrs ) => (
				<motion.div
					className="flex flex-col items-start gap-5 w-[300px] h-auto bg-white rounded-lg shadow-xl p-4 border border-solid border-border-primary"
					style={ { opacity } }
					{ ...attrs }
				>
					<div className="w-full space-y-2">
						<p className="!text-zip-app-heading !text-base !font-semibold">
							{ __( 'Are you sure?', 'ai-builder' ) }
						</p>
						<p className="!text-zip-body-text !text-sm !font-normal">
							{ __(
								'This will redirect you to the first screen and discard the progress you have made.',
								'ai-builder'
							) }
						</p>
						<p className="!text-zip-body-text !text-sm !font-normal">
							{ __(
								"If you prefer to continue, click 'Cancel'.",
								'ai-builder'
							) }
						</p>
					</div>
					<div className="flex justify-end gap-3 w-full">
						<Button
							className="text-zip-app-heading text-xs font-semibold py-1.5 px-3 rounded border border-solid border-border-tertiary shadow-sm"
							type="button"
							variant="blank"
							onClick={ toggleShow }
						>
							<span>{ __( 'Cancel', 'ai-builder' ) }</span>
						</Button>
						<Button
							className="text-white text-xs font-semibold py-1.5 px-3 rounded border border-solid border-alert-error-text bg-alert-error-text shadow-sm"
							type="button"
							variant="blank"
							onClick={ onExit }
						>
							<span>{ __( 'Exit', 'ai-builder' ) }</span>
						</Button>
					</div>
					{ /* Arrow */ }
					<div
						data-popper-arrow
						className="-top-1 absolute w-2 h-2 bg-inherit before:content-[''] before:w-2 before:h-2 before:bg-inherit before:absolute invisible before:visible before:!rotate-45 before:border-t before:border-l before:border-border-primary"
					/>
				</motion.div>
			) }
			interactive={ true }
			interactiveBorder={ 20 }
			placement={ placement }
		>
			<button
				onClick={ toggleShow }
				className={ classNames(
					'p-0 border-0 w-auto h-auto bg-transparent cursor-pointer focus:outline-none transition-colors ease-in-out duration-150',
					exitButtonClassName
				) }
			>
				<XMarkIcon className="w-6 h-6" />
			</button>
		</Tippy>
	);
};

export default ExitConfirmationPopover;
