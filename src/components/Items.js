import React from 'react'
import Itemcard from './Itemcard'

const Items = ({ ItemsArr }) => {
    return (
        <>
            {ItemsArr?.map((element,key) => {
                return <div className="col-md-4" key={key} style={{ padding: '10px' }}>
                    <Itemcard
                        brand={element.brand}
                        category={element.category}
                        description={element.description}
                        price={element?.price ?element.price:0}
                        img={element.thumbnail}
                        title={element.title}
                        discount={element.discountPercentage}
                        stock={element.stock}
                        rating={element.rating}
                        images={element.images}
                        item={element}
                    />
                </div>
            })}
        </>
    )
}

export default Items