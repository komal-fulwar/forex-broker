export default function Slide({ data, index, total }) {
  if (data.type === 'title') return <TitleSlide data={data} index={index} total={total} />
  if (data.type === 'thankyou') return <ThankYouSlide data={data} index={index} total={total} />
  return <ContentSlide data={data} index={index} total={total} />
}

function TitleSlide({ data, index, total }) {
  return (
    <div className="slide slide--title">
      <div className="title-line title-line--top" />
      <h1>{data.title}</h1>
      <div className="title-divider" />
      <p className="title-subtitle">{data.subtitle}</p>
      <p className="title-author">{data.author}</p>
      <p className="title-meta">{data.meta}</p>
      <div className="title-line title-line--bottom" />
      <span className="slide-number">{index + 1} / {total}</span>
    </div>
  )
}

function ThankYouSlide({ data, index, total }) {
  return (
    <div className="slide slide--thankyou">
      <div className="title-line title-line--top" />
      <h2>Thank You</h2>
      <div className="title-divider" />
      <p className="subtitle">Questions &amp; Discussion</p>
      <p className="contact">[Your Name] &nbsp;•&nbsp; [Email]</p>
      <div className="title-line title-line--bottom" />
      <span className="slide-number">{index + 1} / {total}</span>
    </div>
  )
}

function ContentSlide({ data, index, total }) {
  return (
    <div className="slide">
      <div className="slide-header">
        <h2>{data.heading}</h2>
      </div>
      <div className="slide-body">
        {data.content}
      </div>
      <span className="slide-number">{index + 1} / {total}</span>
    </div>
  )
}
