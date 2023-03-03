const binaryTree = {
    val: 'a',
    left: {
        val: 'b',
        left: {
            val: 'd',
            left: null,
            right: null
        },
        right: {
            val: 'e',
            left: null,
            right: null
        }
    },
    right: {
        val: 'c',
        left: {
            val: 'f',
            left: null,
            right: null
        },
        right: {
            val: 'g',
            left: null,
            right: null
        }
    }
}

// 前序遍历
function pre(node){
    if(!node){
        return
    }
    console.log(node.val)
    pre(node.left)
    pre(node.right)
}

// pre(binaryTree)

function mid(node){
    if(!node){
        return
    }
    mid(node.left)
    console.log(node.val)
    mid(node.right)
}

// mid(binaryTree)

   // d b e a f c g

//    后序遍历
function after(node){
    if(!node){
        return
    }
    after(node.left)
    after(node.right)
    console.log(node.val)
}
// after(binaryTree)
 // d e b f g c a

//  利用非递归方式

function prestack(root){
    let stack = [root]
    while(stack.length){
        let node = stack.pop()
        if(node.right){
            stack.push(node.right)
        }
        if(node.left){
            stack.push(node.left)
        }
        console.log(node.val)
    }
    
}
// prestack(binaryTree)

function midstack(root){
    if(!root){
        return
    }
    let p = root
    let stack = []
    while(stack.length || p){
        while(p){
            stack.push(p)
            p = p.left
        }

        let node = stack.pop()
        console.log(node.val)
        p = node.right
    }
}

// midstack(binaryTree)

function backstack(root){
    
}