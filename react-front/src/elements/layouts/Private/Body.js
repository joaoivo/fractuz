export function LayoutPrivateBody({children,...props}) {
	return (
		<div className="wtdhGeneral_duz24vw_20" style={{border :"1px solid gray" }}>
			<h1>{props && props.title && props.title}</h1>
			<hr/>
			<div>
				{children}
			</div>
		</div>
	);
}
