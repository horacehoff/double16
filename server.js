const express = import('express')
const app = (await express)()
const port = 3000

app.get('/', (req, res) => {
    res.send(`<html lang="en">
<head>
<meta charset="UTF-8" />
<title data-react-helmet="true">DOUBLE16</title>
<meta content="DOUBLE16"
      data-react-helmet="true" name="title"/>
<meta content="Discover, share, download and sell code snippets on DOUBLE16."
      data-react-helmet="true" name="description"/>

<meta content="website" property="og:type"/>
<meta content="https://double16.vercel.app/" data-react-helmet="true" property="og:url"/>
<meta content="DOUBLE16" data-react-helmet="true" property="og:title"/>
<meta content="Discover, share, download and sell code snippets on DOUBLE16."
      data-react-helmet="true" property="og:description"/>
<meta content="/banner.webp" property="og:image"/>

<meta content="summary_large_image" property="twitter:card"/>
<meta content="https://double16.vercel.app/" data-react-helmet="true" property="twitter:url"/>
<meta content="DOUBLE16" data-react-helmet="true" property="twitter:title"/>
<meta content="Discover, share, download and sell code snippets on DOUBLE16."
      data-react-helmet="true" property="twitter:description"/>
<meta content="/banner.webp" property="twitter:image"/>
</head>
</html>
`)
})

app.get('/explore', (req, res) => {
    res.send(`<html lang="en">
<head>
<meta charset="UTF-8" />
<title>DOUBLE16 | Explore</title>
<meta content="DOUBLE16 | Explore"
name="title"/>
<meta content="Explore and discover code snippets on DOUBLE16."
name="description"/>

<meta content="https://double16.vercel.app/explore" property="og:url"/>
<meta content="DOUBLE16 | Explore" property="og:title"/>
<meta content="Explore and discover code snippets on DOUBLE16."
property="og:description"/>

<meta content="https://double16.vercel.app/explore" property="twitter:url"/>
<meta content="DOUBLE16 | Explore" property="twitter:title"/>
<meta content="Explore and discover code snippets on DOUBLE16."
property="twitter:description"/>
</head>
</html>
`)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})