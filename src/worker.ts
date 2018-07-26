/** Program Name : Angular Fridge
 ** Author : Peter Cross
 ** Date : July 26, 2018
 */

onmessage = ( msg: any ) => 
{
    let handler = new WorkerHandler( msg.data )
    
    setInterval( worker => postMessage( handler.manipulateImageData(), undefined ), 300 )    
}

class WorkerHandler
{
    private CVS_WIDTH: number
    private CVS_HEIGHT: number
    
    private A = 0.1 // Math.random()
    
    private imgData: any
    
    
    constructor( data: any )
    {
        this.CVS_WIDTH = data[0]
        this.CVS_HEIGHT = data[1]
        this.imgData = data[2]
     }
    
    manipulateImageData( imgData: any = this.imgData )
    {
        let p = new Array(5)
        let red = new Array(5)
        let green = new Array(5)
        let blue = new Array(5)
        let alpha = new Array(5)
        
        for ( let y = 0; y < this.CVS_HEIGHT; y++ )
            for ( let x = 0; x < this.CVS_WIDTH; x++ )
            {
                p[0] = this.getDataIdx( x, y )
                p[1] = x < this.CVS_WIDTH-2 ? this.getDataIdx( x+1, y ) : p[0]
                p[2] = x > 0 ? this.getDataIdx( x-1, y ) : p[0]
                p[3] = y < this.CVS_HEIGHT-2 ? this.getDataIdx( x, y+1 ) : p[0]
                p[4] = y > 0 ? this.getDataIdx( x, y-1 ) : p[0]
            
                for ( let i = 0; i < p.length; i++ )
                {
                    red[i]   = imgData.data[p[i]]
                    green[i] = imgData.data[p[i]+1]
                    blue[i]  = imgData.data[p[i]+2]
                    alpha[i] = imgData.data[p[i]+3]
                }
                
                imgData.data[p[0]]   = this.blurringAlgorithm( red[0], red[1], red[2], red[3], red[4] )           //red
                imgData.data[p[0]+1] = this.blurringAlgorithm( green[0], green[1], green[2], green[3], green[4] ) //green
                imgData.data[p[0]+2] = this.blurringAlgorithm( blue[0], blue[1], blue[2], blue[3], blue[4] )      //blue
                imgData.data[p[0]+3] = this.blurringAlgorithm( alpha[0], alpha[1], alpha[2], alpha[3], alpha[4] ) //alpha
            }
        
        return imgData
    }

    
    private blurringAlgorithm( c0: number, c1: number, c2: number, c3: number, c4: number ) 
    {
        return ( (1-this.A )* c0 + this.A * ( c1 + c2 + c3 + c4 )/4 )  
    }
    
    
    private getDataIdx( x: number, y: number )
    {
        return (y * this.CVS_WIDTH + x) * 4
    }    
}