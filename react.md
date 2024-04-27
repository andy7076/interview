## Redux的执行流程
**定义状态（State）：**在 Redux 应用中，所有的状态都被保存在一个单一的状态树（state tree）中。开发者需要定义初始状态，并根据应用的需求设计好状态的结构。
**定义动作（Action）：**动作是一个包含了描述发生了什么的信息的普通对象。开发者需要定义各种各样的动作来描述应用中可能发生的各种事件。
**编写纯函数（Reducers）：**Reducer 是一个纯函数，用于根据给定的动作和当前状态来计算新的状态。它接收两个参数：当前状态（state）和要处理的动作（action），并返回一个新的状态。
**创建存储（Store）：**Store 是 Redux 应用的核心，它是一个包含整个应用状态树的对象。开发者需要通过 createStore 函数创建 Store，并将 Reducer 传递给它。
**派发动作（Dispatch Actions）：**要更新应用状态，需要派发一个动作到 Store。开发者可以通过调用 store.dispatch(action) 来派发一个动作。
**Reducer 处理动作：**一旦动作被派发到 Store，Reducer 就会被调用，它根据当前状态和动作计算出新的状态。
**状态更新：**一旦新的状态被计算出来，Redux 会将新的状态替换掉旧的状态，然后通知所有订阅了 Store 的地方。
**订阅状态变化（Subscribe to State Changes）：**开发者可以通过调用 store.subscribe(listener) 来订阅状态的变化。每当状态发生变化时，监听器函数就会被调用。
**更新 UI：**最后，开发者需要根据新的状态来更新用户界面，以反映出最新的状态信息。

## React生命周期
挂载阶段（Mounting）：
  constructor(): 构造函数，组件被创建时调用，用于初始化 state 和绑定事件处理程序。
  static getDerivedStateFromProps(): 静态方法，用于根据新的 props 更新 state。React 16.3 引入。
  render(): 渲染方法，用于生成组件的虚拟 DOM。
  componentDidMount(): 组件挂载完成后调用，通常用于发送网络请求、订阅事件等操作。
更新阶段（Updating）：
  static getDerivedStateFromProps(): 与挂载阶段相同。
  shouldComponentUpdate(): 决定是否重新渲染组件，返回 true 表示重新渲染，false 表示跳过渲染。优化性能时常用。
  render(): 与挂载阶段相同。
  getSnapshotBeforeUpdate(): 在更新 DOM 之前调用，用于获取更新前的 DOM 信息。React 16.3 引入。
  componentDidUpdate(): 组件更新完成后调用，通常用于处理更新后的 DOM 或执行一些副作用操作。
卸载阶段（Unmounting）：
  componentWillUnmount(): 组件即将被卸载时调用，用于清理定时器、取消网络请求等操作。
错误处理（Error Handling）：
  static getDerivedStateFromError(): 用于捕获组件渲染期间的错误并更新 state。React 16 引入。
  componentDidCatch(): 用于处理组件渲染期间的错误，通常用于记录错误日志。
React 17 中的变更：
  移除了不安全的生命周期方法：componentWillMount(), componentWillReceiveProps(), componentWillUpdate()。

## React diff
React 的 diff 算法是用于比较 Virtual DOM 树的变化，并且最小化实际 DOM 操作的一种算法。它通过比较前后两次 Virtual DOM 树的差异，找出需要更新的部分，然后只对这些部分进行实际的 DOM 操作，以提高性能。

具体来说，React 的 diff 算法有以下几个步骤：
1. 递归地对比两棵 Virtual DOM 树的节点：
如果节点类型不同，则直接将旧节点替换为新节点。
如果节点类型相同，继续比较子节点。
2. 对同一层级的子节点进行遍历比较：
如果节点的位置发生了变化，则移动节点，而不是销毁和重建。
如果节点的类型相同但属性发生了变化，则更新属性。
3. 利用 key 进行优化：
如果节点有唯一的 key 属性，React 可以根据 key 来判断节点的新增、删除和移动，从而减少不必要的 DOM 操作。

## 为什么要使用Fiber架构
React的传统更新机制在处理大规模、复杂组件树或需要保证高帧率的动画场景时，可能会遇到性能瓶颈。这是因为之前的更新过程通常是同步且连续的，一旦开始更新，必须直到整个组件树完成渲染才能释放主线程。这可能导致长时间阻塞浏览器主线程，进而引发界面卡顿，无法满足60fps的流畅体验标准。

## React Fiber
React Fiber引入了一种基于任务优先级和可中断的工作单元（称为“fiber”）的新架构。每个React组件在内存中对应一个Fiber节点，形成一个Fiber树。Fiber节点不仅包含了组件的属性、状态、上下文等信息，还记录了渲染过程的相关元数据，如优先级、副作用列表等。

## FiberNode
FiberNode 的一些重要属性和信息包括：

type： 表示节点的类型，可以是函数组件、类组件、原生 DOM 元素等。
key 和 props： 节点的唯一标识符和属性，用于对比不同渲染周期的节点。
alternate： 用于双缓存技术，表示与当前 FiberNode 相对应的上一次渲染的 FiberNode。
child、sibling 和 return： 用于表示节点的子节点、兄弟节点和父节点的关系。
effectTag 和 effect： 表示节点的操作类型（插入、更新、删除等）和需要执行的副作用。
stateNode： 与节点对应的实际 DOM 元素、组件实例等。

通过这些属性，React Fiber 可以构建一棵虚拟 DOM 树，并在渲染过程中对其进行协调、更新和处理。FiberNode 的设计使得 React 能够实现增量渲染和中断恢复等特性，从而提高应用的性能和响应性。

## React setState后都做了什么
**合并更新对象：**如果你给 setState() 传递的参数是一个对象，React 会将这个对象与当前状态进行合并。
**将更新加入队列：**React 会将更新操作加入一个队列中，而不是立即执行。这样做是为了提高性能，因为 React 可以将多个更新操作合并为一个更新。
**触发组件更新：**当状态更新被加入队列后，React 会将更新队列中的操作批量执行，并触发组件的重新渲染。
**执行生命周期方法：**在重新渲染组件之前和之后，React 会执行相关的生命周期方法，例如 shouldComponentUpdate、componentWillUpdate 和 componentDidUpdate。
**调用 render 方法：**React 会调用组件的 render() 方法来生成新的虚拟 DOM 树。
**比较虚拟 DOM：**React 使用虚拟 DOM 的 diff 算法来比较新旧虚拟 DOM 树的差异，以确定需要更新的部分。
**更新 DOM：**一旦确定了需要更新的部分，React 会将这些变化应用到真实的 DOM 上，从而更新用户界面。

## React为什么要使用函数式组件

## setState做了什么
当在React组件中调用setState()方法后，React会执行一系列操作来处理状态变更并更新界面。以下是setState()调用后发生的关键步骤：

==== 状态合并：
setState()接受一个对象或一个函数作为参数。如果是对象，React将其与当前状态合并，只更新指定的属性。如果是函数，React会将其与当前状态及可能的props作为参数调用，返回一个新的状态对象。
这种合并是浅层的，即React不会深入合并嵌套对象。若需要深度合并，需要自行处理或使用专门的库。
异步处理：

虽然setState()的调用看起来像是同步操作，但实际上React将其视为异步。这意味着调用setState()后，状态可能不会立即更新，而且在setState()调用后立即访问this.state或useState Hook 返回的状态变量可能不会得到最新的值。
这种异步行为旨在提高性能，通过将多个连续的setState()调用合并成一个批次更新，避免频繁地重新渲染组件。
==== 批量更新：

React内部维护一个更新队列，当setState()被调用时，更新请求会被加入到队列中，而不是立即应用更改。React会等待当前事件循环结束，然后一次性处理队列中的所有更新，进行批量状态合并。

=== 组件生命周期方法：
在处理更新队列时，React会触发相关的生命周期方法（对于类组件）或钩子函数（对于函数组件）：
shouldComponentUpdate / React.memo：如果存在，React会检查shouldComponentUpdate()方法（类组件）或React.memo包裹的组件的props对比结果，决定是否需要继续渲染过程。
getDerivedStateFromProps（类组件） / useEffect（函数组件）：在新的状态应用后，getDerivedStateFromProps（仅类组件）会被调用来计算衍生状态，而useEffect（函数组件）会在渲染后执行副作用操作。
render：如果组件需要更新，React会调用render()方法（类组件）或再次执行函数组件体，生成新的虚拟DOM树。
componentDidUpdate（类组件） / useLayoutEffect / useEffect（函数组件）：在DOM更新完成后，componentDidUpdate（类组件）或相应的钩子函数会被调用，用于执行与DOM交互或其他需要最新DOM状态的操作。

==== 虚拟DOM比较（Reconciliation）：
React使用高效的Diff算法比较新的虚拟DOM树（由render()方法生成）与旧的虚拟DOM树。它会识别出哪些部分发生了变化，而非每次都重新生成整个DOM结构。

==== DOM更新（Commit）：
基于Diff结果，React仅对实际DOM进行必要的最小化更新，包括添加、删除、移动或更新DOM元素。这一过程发生在浏览器主线程中，确保UI与React组件状态保持一致。

==== Suspense与异步渲染：
如果组件使用了Suspense来处理异步加载的数据，React会在数据加载过程中展示占位符或加载状态。一旦数据准备就绪，React会自动触发必要的更新以展示新数据。
综上所述，setState()调用后，React会执行状态合并、批量更新、触发生命周期方法或钩子函数、进行虚拟DOM比较、更新实际DOM，并可能处理Suspense相关的异步渲染。这一系列操作确保了React应用能够响应状态变化并高效地更新用户界面。

## React渲染流程
React 渲染流程涉及多个关键步骤，这些步骤确保了当应用程序状态发生变化时，React 能够有效地更新界面。以下是对React渲染流程的概述：

===== 初始化渲染：

创建React元素：首先，React通过调用ReactDOM.render()函数或在函数组件/类组件中返回JSX来创建React元素（或称为虚拟DOM树）。React元素是轻量级的描述性对象，它们代表了UI应该呈现的样子。

构造Fiber树：React使用Fiber架构来管理组件的更新。Fiber树是React元素对应的内部数据结构，它允许React以更细粒度的方式控制更新过程。Fiber树在初始化渲染时由React构建，对应于传入render()函数的React元素树。

生成DOM树：React遍历Fiber树，根据每个Fiber节点的信息创建实际的DOM节点。对于原生HTML元素，React直接创建相应的DOM元素；对于用户定义的组件，React递归地渲染其内部子元素。这个过程被称为“ reconciliation”。

插入DOM：React将生成的DOM树插入到浏览器的文档中，完成首次渲染。

===== 更新渲染（状态变化或props变化触发）：

组件更新：当组件的状态（state）或属性（props）发生变化时，React会触发组件重新渲染。这通常始于顶层组件，通过调用setState()或接收新的props。

调度（Scheduler）：React的调度器负责确定更新任务的优先级，并安排它们在合适的时机执行。高优先级的任务（如与用户交互相关的变化）会被优先处理。

协调（Reconciliation）：Reconciler开始工作，它通过遍历新的React元素树并与现有Fiber树进行对比（使用高效的diff算法），找出需要更新、添加或删除的DOM节点。对于有差异的部分，Reconciler会给对应的Fiber节点打上特定的标记（effect tag），指示Renderer应如何操作DOM。

提交（Commit）：Renderer根据Reconciler提供的标记，执行实际的DOM操作。这可能包括修改节点属性、替换或插入新节点、删除不再需要的节点等。在commit阶段，React还会处理副作用（side effects），如执行useEffect钩子中的清理函数和回调。

异步渲染（Time Slicing & Suspense）：React 16引入的Fiber架构支持异步渲染，即可以在多次小的浏览器空闲时段内逐步完成更新，而不是阻塞主线程一次完成。这有助于提高页面响应性能。此外，Suspense用于处理数据加载的异步边界，允许组件在数据未准备好时显示占位符或加载状态，待数据就绪后自动完成渲染。

=== 优化策略：

ShouldComponentUpdate / React.memo：为了减少不必要的渲染，React提供了生命周期方法shouldComponentUpdate（在类组件中）或React.memo（在函数组件中）来包裹组件，允许开发者判断是否需要基于新的props或state进行更新。如果返回false，则组件及其子组件将跳过此次更新。

PureComponent / React.PureComponent：对于仅依赖props和state进行渲染且没有副作用的组件，可以使用React.PureComponent（类组件）或保持函数组件的纯度，React会进行浅层比较以决定是否需要重新渲染。

Context API / useContext：React的Context API提供了一种在组件树中传递数据而不必逐层手动传递props的方法。使用useContext Hook可以直接访问上下文中的值，避免因深层组件props变化导致的不必要的重渲染。

总结来说，React渲染流程包括初始化渲染和更新渲染两个主要阶段。每个阶段都涉及构建或更新React元素、Fiber树、DOM树以及可能的副作用处理。React通过一系列优化策略，如Fiber架构、diff算法、调度机制以及各种优化工具，确保高效且灵活的UI更新。