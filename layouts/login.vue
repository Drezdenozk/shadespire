<template>
    <section class="page-content">
        <div class="page-content-inner sign-in-page" style="background:#38354a;">
            <div class="single-page-block-header">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="logo">
                            <img class="logo-inverse" src="~static/logo_wmr_w.svg" alt="Web masters rules!" />
                        </div>
                    </div>
                </div>
            </div>
            <nuxt/>
            <div class="single-page-block-footer text-center">
                <ul class="list-unstyled list-inline">
                    <li></li>
                </ul>
            </div>
        </div>
        <div class="main-backdrop"><!-- --></div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
      computed: mapGetters([
        'isAuthenticated',
        'loggedUser'
      ]),
      middleware: 'logged'
    }
</script>
