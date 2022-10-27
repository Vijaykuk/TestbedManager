<template>
  <li class="context-menu-item">
    <slot/>
  </li>
</template>

<script>
export default {

}
</script>

<style scoped>
.context-menu-item {
    display: block;
    position: relative;
    padding: 2px 2px;
    background: #fff;
    border-radius: 0;
    color: #005073;
    text-decoration: none;
    font-size: 17px;
   text-align: left;
    cursor: pointer;
    padding: 8px;
    border-bottom: 1px dotted #ccc;
 }
    .context-menu-item:hover .context-menu-item:focus{
        background: #fff;
       color:#000;
       outline: none;
    }

</style>

