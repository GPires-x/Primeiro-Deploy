export const loadingPost = async()=>{
  const postReponse = fetch('https://jsonplaceholder.typicode.com/posts')
  const phtoReponse = fetch('https://jsonplaceholder.typicode.com/photos')

  const [post,photos] = await Promise.all([postReponse,phtoReponse])

  const postJson = await post.json()
  const photsJson = await photos.json()

  const photsAndPost = postJson.map((post,index)=>{
    return{...post,cover:photsJson[index].url}
  })
  return photsAndPost
}