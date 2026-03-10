<script>
    let { data, form } = $props();
</script>

<header class="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
    <div class="user-info">
        <form method="POST" action="?/logout">
            <button type="submit" class="btn btn-outline-danger btn-sm">Logout</button>
        </form>
    </div>
</header>

