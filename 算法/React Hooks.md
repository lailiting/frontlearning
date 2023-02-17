# 算法精选

## 树的DFS和BFS

## 二叉树的前序，中序，后序遍历

## 排序算法

```js
堆排序
    // 建立一个大顶堆(升序)或者小顶堆(降序)
    // 从最后一个非叶子节点开始
    const buildHeap = (data)=>{
        len = data.length
        for(let i = Math.floor(len/2)-1; i >= 0 ; i--){
            heapAdjust(data,i, len)
        }
    }
    // 检查是否符合堆的性质
    const heapAdjust = (data, i, len)=>{
        child = 2*i + 1
        while(child < len){
            if(child + 1 < len && data[child + 1] > data[child]){
                child = child+1
            }
            if(data[i] < data[child]){
                let temp = data[i]
                data[i] = data[child]
                data[child] = temp
                i = child
                child = 2*child+1
            }else{
                break
            }
        }
    }
    // 进行置换排序
    const heapSort = (data) => {
        if(data.length <= 1){
            return data
        }
        buildHeap(data)

        let len = data.length
        for(let i = len-1; i >=0; i--){
            swap(data, i,0)
            heapAdjust(data, 0, i)
        }
    }
    // 置换swap
    const swap = (data, i, j)=>{
        let temp = data[i]
        data[i] = data[j]
        data[j] = temp
    }
    const arr = [62, 88, 58, 47, 35, 73, 51, 99, 37, 93];
    heapSort(arr)
```

```js
 // 快排
    const quickSort = (data, left, right) => {
        if(left >= right){
            return
        }
        let i = left
        let j = right
        let temp = data[left]
        while(i < j){
            while(i < j && data[j] >= temp){
                j--
            }
            data[i] = data[j]
            while(i < j && data[i] < temp){
                i++
            }
            data[j] = data[i]
        }
        data[i] = temp
        quickSort(data, left, i-1)
        quickSort(data, i+1, right)
    }
    const arr = [62, 88, 58, 47, 35, 73, 51, 99, 37, 93];
    // heapSort(arr)
    quickSort(arr, 0,arr.length-1)
    console.log(arr)
```

```js
   // 归并排序
    const merge = (left,right)=>{
        let data = []
        let i=0, j = 0;
        let llen = left.length
        let rlen = right.length
        while( i < llen && j < rlen){
            if(left[i] <= right[j]){
                data.push(left[i])
                i++
            }else{
                data.push(right[j])
                j++
            }
        }
        while( i < llen){
            data.push(left[i])
                i++
        }
        while( j < rlen){
            data.push(right[j])
                j++
        }
        return data
    }

    const mergeSort = (array)=>{
        let len = array.length
        if(len <= 1){
            return array
        }
        mid = Math.floor(len/2)
        let left=array.slice(0,mid)
        let right=array.slice(mid,len)
        return merge(mergeSort(left),mergeSort(right))
    }
    const arr = [62, 88, 58, 47, 35, 73, 51, 99, 37, 93];

    console.log(mergeSort(arr))
```

