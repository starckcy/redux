import { useDispatch, useSelector } from 'react-redux'
import {fetchPhotos, fetchVideos, fetchGifs} from '../api/mediaApi.js'
import {setLoading, setError, setResults} from '../redux/features/searchSlice.js'
import { useEffect } from 'react'
import ResultCard from './ResultCard.jsx'

const ResultGrid = () => {

    const dispatch = useDispatch()
    const {query, activeTab, error, results, loading} = useSelector((store)=>store.search)

    

    useEffect(function(){
        if(!query) return
        const getData = async ()=>{
            try {
                dispatch(setLoading())
                let data = []
                if(activeTab == 'photos'){
                    let response = await fetchPhotos(query)
                    data = response.results.map((item)=>({
                        id:item.id,
                        type:'photo',
                        title:item.alt_description,
                        thumbnail:item.urls.small,
                        src:item.urls.full,
                        url:item.links.html
                    }))
                }
                if(activeTab == 'videos'){
                    let response = await fetchVideos(query)
                    console.log(response.hits);
                    
                    data = response.hits.map((item)=>({
                        id:item.id,
                        type:'video',
                        title:item.name,
                        thumbnail:item.videos.medium.thumbnail,
                        src:item.videos.medium.url,
                        url:item.pageURL
                    }))
                }
                if(activeTab == 'gif'){
                    let response = await fetchGifs(query)
                    data = response.data.map((item)=>({
                        id:item.id,
                        type:'gif',
                        title:item.title,
                        thumbnail:item.images.downsized.url,
                        src:item.images.original.url,
                        url:item.url
                    }))
                }

            dispatch(setResults(data))
            } catch (err) {
                dispatch(setError(err.message))
            }
        }

        getData()
    }, [query, activeTab, dispatch])

    if(error) return <h1>Error</h1>
    if(loading) return <h1>Loading...</h1>

  return (
    <div className='flex flex-wrap justify-center w-full gap-6 overflow-auto px-10 py-6'>
        {results.map((item, idx)=>{
            return (
                <div key={idx}>
                    <ResultCard item={item} />
                </div>
            )
        })}
    </div>
  )
}

export default ResultGrid