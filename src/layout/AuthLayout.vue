<template>
  <div class="main-content bg-default" style="background-color: #fafafa!important;">
    <!-- Navbar -->
    <base-nav
      class="navbar-horizontal"
      containerClasses="px-4 container"
      expand
    >
      <svg
        style="cursor: pointer"
        @click="backHome()"
        class="ml--7"
        width="183"
        height="37"
        viewBox="0 0 183 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50.9399 11.4254C52.1999 12.5354 52.8299 14.1854 52.8299 16.3154V27.3854H50.0699V17.2754C50.0699 15.4754 49.6799 14.1554 48.8999 13.3454C48.1199 12.5354 47.0999 12.1454 45.8099 12.1454C44.9056 12.1441 44.0129 12.3494 43.1999 12.7454C42.3589 13.1954 41.6699 13.8844 41.2199 14.7254C40.6799 15.6254 40.4399 16.7954 40.4399 18.1754V27.3854H37.6499V10.5854L40.1999 11.6354L40.2599 12.7754C40.7879 11.7653 41.6304 10.9545 42.6599 10.4654C43.724 9.94693 44.8965 9.68981 46.0799 9.71543C48.0399 9.71543 49.6599 10.2854 50.9399 11.4254Z"
          fill="#000000"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M59.4898 19.7654H72.5398C72.6345 19.1196 72.6846 18.4681 72.6898 17.8154C72.7087 16.3946 72.4008 14.9883 71.7898 13.7054C71.2008 12.497 70.2732 11.4859 69.1198 10.7954C67.8481 10.0502 66.3932 9.67607 64.9198 9.71543C62.3098 9.71543 60.3298 10.5254 58.8898 12.1154C57.4498 13.7054 56.7598 15.8954 56.7598 18.7154C56.7598 21.5354 57.4798 23.7554 58.9798 25.3454C60.4798 26.9354 62.5198 27.7454 65.1298 27.7454C66.9298 27.7454 68.4298 27.4154 69.5698 26.7554C70.7415 26.1136 71.7006 25.144 72.3298 23.9654L70.0198 22.7354C69.7184 23.5719 69.1059 24.2597 68.3098 24.6554C67.3156 25.1199 66.2267 25.3459 65.1298 25.3154C63.5398 25.3154 62.2198 24.8054 61.2298 23.8454C60.2398 22.8854 59.6398 21.5354 59.4898 19.7654ZM59.5198 17.3054C59.7298 15.6554 60.2998 14.3954 61.2298 13.4954C62.1598 12.5954 63.4498 12.1454 64.9198 12.1454C66.3898 12.1454 67.5598 12.6254 68.4298 13.5254C69.2998 14.4254 69.8398 15.6854 70.0198 17.3054H59.5198Z"
          fill="#000000"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M93.27 18.7154C93.27 15.8954 92.52 13.7054 91.02 12.1154C89.55 10.5254 87.48 9.71542 84.87 9.71542C82.26 9.71542 80.19 10.5254 78.72 12.1154C77.25 13.7054 76.5 15.8954 76.5 18.7154C76.5 21.5354 77.22 23.7554 78.72 25.3454C80.22 26.9354 82.26 27.7454 84.87 27.7454C87.48 27.7454 89.52 26.9354 91.02 25.3454C92.52 23.7554 93.27 21.5354 93.27 18.7154ZM79.26 18.7154C79.26 16.6754 79.77 15.0554 80.76 13.8854C81.75 12.6854 83.1 12.1154 84.87 12.1154C86.64 12.1154 88.02 12.7154 89.01 13.8854C90 15.0554 90.48 16.6454 90.48 18.7154C90.48 20.7854 90 22.4054 89.01 23.5754C88.02 24.7454 86.61 25.3454 84.87 25.3454C83.13 25.3454 81.75 24.7454 80.76 23.5754C79.77 22.4054 79.26 20.7554 79.26 18.7154Z"
          fill="#000000"
        />
        <path
          d="M0 6.38542V30.4754L15.66 36.0854V11.7854L32.55 5.57542L17.22 0.0854187L0 6.38542Z"
          fill="#000000"
        />
        <path
          d="M16.9199 12.6854V25.6754L32.5499 31.2554V6.89542L16.9199 12.6854Z"
          fill="#000000"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M143.3 10.44V25H141.02V10.44H143.3ZM116.04 25V23H107.74V18.68H115.22V16.68H107.74V12.72H115.7V10.72H105.4V25H116.04ZM119.62 25L122.22 21.18L124.8 25H127.48L123.46 19.5L127.02 14.66H124.36L122.22 17.82L120.06 14.66H117.4L120.96 19.5L116.94 25H119.62ZM131.06 23.58V28.96H128.78V14.66H130.9V15.76C131.62 14.84 132.66 14.38 134.02 14.38C135.54 14.38 136.74 14.92 137.62 16C138.42 17 138.82 18.28 138.82 19.88C138.82 21.4 138.42 22.66 137.64 23.66C136.8 24.74 135.62 25.28 134.14 25.28C132.94 25.28 131.9 24.7 131.06 23.58ZM133.6 23.44C132.86 23.44 132.26 23.14 131.78 22.54C131.24 21.88 130.98 21 130.98 19.92V19.76C130.98 18.72 131.18 17.9 131.62 17.28C132.1 16.56 132.78 16.22 133.68 16.22C134.68 16.22 135.42 16.58 135.9 17.3C136.28 17.9 136.48 18.76 136.48 19.88C136.48 21 136.26 21.86 135.84 22.46C135.36 23.1 134.6 23.44 133.6 23.44ZM150.7 25.28C152.26 25.28 153.54 24.76 154.5 23.72C155.42 22.72 155.9 21.42 155.9 19.84C155.9 18.24 155.42 16.94 154.48 15.92C153.52 14.88 152.26 14.38 150.7 14.38C149.12 14.38 147.86 14.88 146.92 15.92C145.96 16.94 145.5 18.24 145.5 19.84C145.5 21.42 145.96 22.72 146.9 23.72C147.86 24.76 149.12 25.28 150.7 25.28ZM148.5 22.3C149.02 23.04 149.74 23.42 150.7 23.42C151.64 23.42 152.38 23.04 152.9 22.3C153.34 21.64 153.58 20.82 153.58 19.84C153.58 18.84 153.34 18 152.9 17.36C152.38 16.6 151.64 16.24 150.7 16.24C149.74 16.24 149.02 16.6 148.5 17.36C148.06 18 147.84 18.84 147.84 19.84C147.84 20.84 148.06 21.66 148.5 22.3ZM160.16 25V19.52C160.16 18.64 160.42 17.94 160.98 17.4C161.46 16.92 162 16.7 162.6 16.7C163.08 16.7 163.56 16.76 164.08 16.92V14.64C163.72 14.46 163.28 14.38 162.78 14.38C162.14 14.38 161.6 14.56 161.14 14.94C160.76 15.22 160.44 15.62 160.16 16.14V14.66H157.9V25H160.16ZM173.32 24.1C172.4 24.88 171.26 25.28 169.88 25.28C168.34 25.28 167.12 24.8 166.22 23.86C165.26 22.88 164.78 21.54 164.78 19.82C164.78 18.28 165.22 17 166.14 15.96C167.02 14.9 168.24 14.38 169.78 14.38C171.48 14.38 172.78 14.94 173.68 16.1C174.5 17.14 174.92 18.6 174.92 20.46H167.18C167.26 21.42 167.52 22.16 167.96 22.66C168.4 23.16 169.04 23.42 169.86 23.42C170.56 23.42 171.12 23.26 171.56 22.94C171.9 22.68 172.2 22.26 172.48 21.68H174.76C174.52 22.64 174.04 23.46 173.32 24.1ZM172.54 18.74H167.22C167.36 17.92 167.64 17.3 168.06 16.88C168.5 16.44 169.08 16.24 169.84 16.24C171.44 16.24 172.34 17.06 172.54 18.74ZM178.98 19.52V25H176.72V14.66H178.98V16.14C179.26 15.62 179.58 15.22 179.96 14.94C180.42 14.56 180.96 14.38 181.6 14.38C182.1 14.38 182.54 14.46 182.9 14.64V16.92C182.38 16.76 181.9 16.7 181.42 16.7C180.82 16.7 180.28 16.92 179.8 17.4C179.24 17.94 178.98 18.64 178.98 19.52Z"
          fill="#000000"
        />
      </svg>

      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/homepage">
            {{ $t("authLayout.home") }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/blocks">
            {{ $t("authLayout.blocks") }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/transactions">
            {{ $t("authLayout.txs") }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/tokens">
            {{ $t("authLayout.tokens") }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/contracts">
            {{ $t("authLayout.contracts") }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/account">
            {{ $t("authLayout.address") }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/candidates">
            {{ $t("authLayout.committee") }}
          </router-link>
        </li>
      </ul>
      <div class="drop">
        <base-dropdown>
          <template v-slot:title>
            <base-button type="default" class="btn btn-sm">
              {{ this.lang }}
            </base-button>
          </template>
          <li>
            <a class="dropdown-item" @click="switch_the_language('en')">
              <span>English 🇬🇧</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item" @click="switch_the_language('cn')">
              <span>中文 🇨🇳</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item" @click="switch_the_language('fr')">
              <span>Français 🇫🇷</span>
            </a>
          </li>
        </base-dropdown>
      </div>
      <div class="searchDiv mr--8" v-if="$route.meta.showSearch">
        <input
          type="text"
          class="over-ellipsis-Auth"
          :placeholder="$t('search.placeholder')"
          v-model="searchVal"
          autocomplete="off"
          @keyup.enter="search()"
        /><button class="buttonres" @click="search()" style="border: white">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.2141 2.31429C3.61587 0.771429 5.65481 0 7.56631 0C9.47782 0 11.5168 0.771429 13.1734 2.31429C15.8495 5.01429 16.1044 9.25714 13.938 12.2143L17.761 16.0714C18.0159 16.3286 18.0159 16.7143 17.761 16.9714L16.869 17.8714C16.7415 18 16.6141 18 16.3592 18C16.1044 18 15.9769 18 15.8495 17.8714L12.0265 14.0143C10.6247 14.9143 9.09552 15.4286 7.56631 15.4286C5.65481 15.4286 3.61587 14.6571 2.2141 13.2429C-0.716874 10.1571 -0.716874 5.27143 2.2141 2.31429ZM3.99817 11.3143C4.89021 12.3429 6.16454 12.8571 7.56631 12.8571C8.96808 12.8571 10.2424 12.3429 11.1345 11.3143C12.1539 10.4143 12.6637 9.12857 12.6637 7.71429C12.6637 6.3 12.1539 5.01429 11.1345 4.11429C10.2424 3.08571 8.96808 2.57143 7.56631 2.57143C6.16454 2.57143 4.89021 3.08571 3.99817 4.11429C2.9787 5.01429 2.46897 6.3 2.46897 7.71429C2.46897 9.12857 2.9787 10.4143 3.99817 11.3143Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </base-nav>
    <!-- Header -->

    <div v-if="$route.meta.HomePage" style="background: #fafafa"></div>
    <div v-else class="header py-7 py-lg-6" style="background: #fafafa"></div>

    <router-view></router-view>
    <div style="border-top: 1px solid rgba(40, 43, 52, 0.1);;background-color: rgb(250,250,250);height: 300px">

      <div class="row mt-5 mb-3" style="width: 80%;margin-left: 10%">
        <div class="col-2">
          <svg width="183" height="36" viewBox="0 0 183 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50.9399 11.34C52.1999 12.45 52.8299 14.1 52.8299 16.23V27.3H50.0699V17.19C50.0699 15.39 49.6799 14.07 48.8999 13.26C48.1199 12.45 47.0999 12.06 45.8099 12.06C44.9056 12.0588 44.0129 12.264 43.1999 12.66C42.3589 13.11 41.6699 13.799 41.2199 14.64C40.6799 15.54 40.4399 16.71 40.4399 18.09V27.3H37.6499V10.5L40.1999 11.55L40.2599 12.69C40.7879 11.6799 41.6304 10.8691 42.6599 10.38C43.724 9.86154 44.8965 9.60442 46.0799 9.63004C48.0399 9.63004 49.6599 10.2 50.9399 11.34Z" fill="#000033"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M59.49 19.68H72.54C72.6347 19.0342 72.6848 18.3827 72.69 17.73C72.709 16.3091 72.4011 14.9029 71.79 13.62C71.2011 12.4116 70.2734 11.4005 69.12 10.71C67.8484 9.96478 66.3934 9.59065 64.92 9.63001C62.31 9.63001 60.33 10.44 58.89 12.03C57.45 13.62 56.76 15.81 56.76 18.63C56.76 21.45 57.48 23.67 58.98 25.26C60.48 26.85 62.52 27.66 65.13 27.66C66.93 27.66 68.43 27.33 69.57 26.67C70.7417 26.0282 71.7009 25.0586 72.33 23.88L70.02 22.65C69.7187 23.4864 69.1061 24.1742 68.31 24.57C67.3158 25.0345 66.2269 25.2605 65.13 25.23C63.54 25.23 62.22 24.72 61.23 23.76C60.24 22.8 59.64 21.45 59.49 19.68ZM59.52 17.22C59.73 15.57 60.3 14.31 61.23 13.41C62.16 12.51 63.45 12.06 64.92 12.06C66.39 12.06 67.56 12.54 68.43 13.44C69.3 14.34 69.84 15.6 70.02 17.22H59.52Z" fill="#000033"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M93.27 18.63C93.27 15.81 92.52 13.62 91.02 12.03C89.55 10.44 87.48 9.63 84.87 9.63C82.26 9.63 80.19 10.44 78.72 12.03C77.25 13.62 76.5 15.81 76.5 18.63C76.5 21.45 77.22 23.67 78.72 25.26C80.22 26.85 82.26 27.66 84.87 27.66C87.48 27.66 89.52 26.85 91.02 25.26C92.52 23.67 93.27 21.45 93.27 18.63ZM79.26 18.63C79.26 16.59 79.77 14.97 80.76 13.8C81.75 12.6 83.1 12.03 84.87 12.03C86.64 12.03 88.02 12.63 89.01 13.8C90 14.97 90.48 16.56 90.48 18.63C90.48 20.7 90 22.32 89.01 23.49C88.02 24.66 86.61 25.26 84.87 25.26C83.13 25.26 81.75 24.66 80.76 23.49C79.77 22.32 79.26 20.67 79.26 18.63Z" fill="#000033"/>
            <path d="M0 6.3V30.39L15.66 36V11.7L32.55 5.49L17.22 0L0 6.3Z" fill="#282B34"/>
            <path d="M16.92 12.6001V25.5901L32.55 31.1701V6.81006L16.92 12.6001Z" fill="#282B34"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M143.3 10.3546V24.9146H141.02V10.3546H143.3ZM116.04 24.9146V22.9146H107.74V18.5946H115.22V16.5946H107.74V12.6346H115.7V10.6346H105.4V24.9146H116.04ZM119.62 24.9146L122.22 21.0946L124.8 24.9146H127.48L123.46 19.4146L127.02 14.5746H124.36L122.22 17.7346L120.06 14.5746H117.4L120.96 19.4146L116.94 24.9146H119.62ZM131.06 23.4946V28.8746H128.78V14.5746H130.9V15.6746C131.62 14.7546 132.66 14.2946 134.02 14.2946C135.54 14.2946 136.74 14.8346 137.62 15.9146C138.42 16.9146 138.82 18.1946 138.82 19.7946C138.82 21.3146 138.42 22.5746 137.64 23.5746C136.8 24.6546 135.62 25.1946 134.14 25.1946C132.94 25.1946 131.9 24.6146 131.06 23.4946ZM133.6 23.3546C132.86 23.3546 132.26 23.0546 131.78 22.4546C131.24 21.7946 130.98 20.9146 130.98 19.8346V19.6746C130.98 18.6346 131.18 17.8146 131.62 17.1946C132.1 16.4746 132.78 16.1346 133.68 16.1346C134.68 16.1346 135.42 16.4946 135.9 17.2146C136.28 17.8146 136.48 18.6746 136.48 19.7946C136.48 20.9146 136.26 21.7746 135.84 22.3746C135.36 23.0146 134.6 23.3546 133.6 23.3546ZM150.7 25.1946C152.26 25.1946 153.54 24.6746 154.5 23.6346C155.42 22.6346 155.9 21.3346 155.9 19.7546C155.9 18.1546 155.42 16.8546 154.48 15.8346C153.52 14.7946 152.26 14.2946 150.7 14.2946C149.12 14.2946 147.86 14.7946 146.92 15.8346C145.96 16.8546 145.5 18.1546 145.5 19.7546C145.5 21.3346 145.96 22.6346 146.9 23.6346C147.86 24.6746 149.12 25.1946 150.7 25.1946ZM148.5 22.2146C149.02 22.9546 149.74 23.3346 150.7 23.3346C151.64 23.3346 152.38 22.9546 152.9 22.2146C153.34 21.5546 153.58 20.7346 153.58 19.7546C153.58 18.7546 153.34 17.9146 152.9 17.2746C152.38 16.5146 151.64 16.1546 150.7 16.1546C149.74 16.1546 149.02 16.5146 148.5 17.2746C148.06 17.9146 147.84 18.7546 147.84 19.7546C147.84 20.7546 148.06 21.5746 148.5 22.2146ZM160.16 24.9146V19.4346C160.16 18.5546 160.42 17.8546 160.98 17.3146C161.46 16.8346 162 16.6146 162.6 16.6146C163.08 16.6146 163.56 16.6746 164.08 16.8346V14.5546C163.72 14.3746 163.28 14.2946 162.78 14.2946C162.14 14.2946 161.6 14.4746 161.14 14.8546C160.76 15.1346 160.44 15.5346 160.16 16.0546V14.5746H157.9V24.9146H160.16ZM173.32 24.0146C172.4 24.7946 171.26 25.1946 169.88 25.1946C168.34 25.1946 167.12 24.7146 166.22 23.7746C165.26 22.7946 164.78 21.4546 164.78 19.7346C164.78 18.1946 165.22 16.9146 166.14 15.8746C167.02 14.8146 168.24 14.2946 169.78 14.2946C171.48 14.2946 172.78 14.8546 173.68 16.0146C174.5 17.0546 174.92 18.5146 174.92 20.3746H167.18C167.26 21.3346 167.52 22.0746 167.96 22.5746C168.4 23.0746 169.04 23.3346 169.86 23.3346C170.56 23.3346 171.12 23.1746 171.56 22.8546C171.9 22.5946 172.2 22.1746 172.48 21.5946H174.76C174.52 22.5546 174.04 23.3746 173.32 24.0146ZM172.54 18.6546H167.22C167.36 17.8346 167.64 17.2146 168.06 16.7946C168.5 16.3546 169.08 16.1546 169.84 16.1546C171.44 16.1546 172.34 16.9746 172.54 18.6546ZM178.98 19.4346V24.9146H176.72V14.5746H178.98V16.0546C179.26 15.5346 179.58 15.1346 179.96 14.8546C180.42 14.4746 180.96 14.2946 181.6 14.2946C182.1 14.2946 182.54 14.3746 182.9 14.5546V16.8346C182.38 16.6746 181.9 16.6146 181.42 16.6146C180.82 16.6146 180.28 16.8346 179.8 17.3146C179.24 17.8546 178.98 18.5546 178.98 19.4346Z" fill="black"/>
          </svg>
<!--          <div style="margin-top:20px;text-align: justify;font-family: Inter;font-style: normal;-->
<!--          font-weight: normal;-->
<!--          font-size: 12px;-->
<!--          line-height: 20px;-->
<!--          color: rgba(0, 0, 0, 0.6);"> neo explorer is a Block Explorer and Analytics Platform for neo, a decentralized smart contracts platform.</div>-->
        </div>

        <div  class="col-2">
          <div class="footer-title">{{$t('bottomBar.developers')}}</div>
          <div style="text-align: center;"><a
              href="https://neo.org/dev#tooling"
              class="nav-link"
              target="_blank"
          >{{$t('bottomBar.tooling')}}</a
          ></div>
          <div style="text-align: center;"><a
              href="https://neo.org/dev#examples"
              class="nav-link"
              target="_blank"
          >{{$t('bottomBar.examples_and_tutorials')}}</a
          ></div>
          <div style="text-align: center;"><a
              href="https://docs.neo.org/docs/zh-cn/index.html"
              class="nav-link"
              target="_blank"
          >{{$t('bottomBar.documentation')}}</a
          ></div>
          <div style="text-align: center;"><a
              href="https://github.com/neo-project"
              class="nav-link"
              target="_blank"
          >GitHub</a
          ></div>
          <div style="text-align: center;"><a
              href="https://neo.org/eco"
              class="nav-link"
              target="_blank"
          >{{$t('bottomBar.eco_support')}}</a
          ></div>
        </div>
        <div  class="col-2">
          <div class="footer-title">{{$t('bottomBar.for_token_holders')}}</div>
          <div style="text-align: center;"><a
              href="https://neo.org/gov"
              class="nav-link"
              target="_blank"
          > {{$t('bottomBar.governance')}} </a
          ></div>
          <div style="text-align: center;"><a
              href="https://neo.org/neogas#tokens"
              class="nav-link"
              target="_blank"
          >{{$t('bottomBar.neo_and_gas')}}</a
          ></div>
          <div style="text-align: center;"><a
              href="https://neo.org/neogas#wallet"
              class="nav-link"
              target="_blank"
          >{{$t('bottomBar.wallet')}}</a
          ></div>
          <div style="text-align: center;"><a
              href="https://neo.org/news?type=blog"
              class="nav-link"
              target="_blank"
          > {{$t('bottomBar.blogs')}} </a
          ></div>
          <div style="text-align: center;"><a
              href="https://neo.org/news?type=event"
              class="nav-link"
              target="_blank"
          > {{$t('bottomBar.events')}} </a
          ></div>

        </div>
        <div  class="col-2">
          <div class="footer-title">{{$t('bottomBar.contact_ngd')}}</div>
          <div style="text-align: center;" > <a
              href="https://neo.org/joinus"
              class="nav-link"
              target="_blank"
          >{{$t('bottomBar.join_us')}}</a
          ></div>
          <div style="text-align: center;" ><a
              href="https://neo.org/eco"
              class="nav-link"
              target="_blank"
          >{{$t('bottomBar.marketing')}}</a
          ></div>
          <div style="text-align: center;" ><a
              href="https://neo.org/eco"
              class="nav-link"
              target="_blank"
          >{{$t('bottomBar.eco_support')}}</a
          ></div>
          <div style="text-align: center;" ><a
              href="https://neo.org/eco"
              class="nav-link"
              target="_blank"
          >{{$t('bottomBar.general')}}</a
          ></div>
        </div>
        <div  class="col-2">
          <div class="footer-title">{{$t('bottomBar.for_media')}}</div>
          <div style="text-align: center;"><a
              href="https://neo.org/about"
              class="nav-link"
              target="_blank"
          >{{$t('bottomBar.about_neo')}}</a
          ></div>
          <div style="text-align: center;"><a
              href="https://neo.org/presskit"
              class="nav-link"
              target="_blank"
          >{{$t('bottomBar.press_kit')}}</a
          ></div>
        </div>
        <div  class="col-2">
          <div class="footer-title">{{$t('bottomBar.keep_in_touch')}}</div>
          <div class="row">
            <div class="col" style="text-align:center">
          <a class="btn btn-sm btn-icon btn-pill" href="https://www.facebook.com/NeoBlockchainOfficial" rel="nofollow noopener" target="_blank" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.1579 0 0 7.1579 0 16C0 24.8421 7.1579 32 16 32C24.8421 32 32 24.8421 32 16C32 7.1579 24.8421 0 16 0ZM19.8358 16H17.3549V24.4211H13.6699V16H11.7895V13.0989H13.6699V11.3288C13.6699 8.99453 14.7225 7.57895 17.6547 7.57895H20.1356V10.48H18.6316C17.5032 10.48 17.4291 10.9053 17.4291 11.6118V13.0274H20.2105L19.8349 16H19.8358Z" fill="black" fill-opacity="0.1"/>
            </svg>
          </a>
            </div>
            <div class="col" style="text-align:center">
          <a class="btn btn-sm btn-icon btn-pill" href="https://medium.com/neo-smart-economy" rel="nofollow noopener" target="_blank" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.0279 31.9995C9.54657 32.0155 3.70391 28.1115 1.22392 22.1275C-1.25608 16.1436 0.102583 9.26223 4.67991 4.68624C9.25723 0.110245 16.1546 -1.26575 22.1252 1.23024C25.0507 2.44352 27.5505 4.49738 29.3082 7.13189C31.066 9.7664 32.0027 12.8631 31.9999 16.0302C31.9999 24.8475 24.8625 31.9835 16.0279 31.9995ZM19.5479 8.91023L19.0519 8.97423C18.7479 9.03823 18.4439 9.13423 18.1559 9.24623C17.5946 9.49161 17.0975 9.86329 16.7034 10.3323C16.3093 10.8013 16.0289 11.355 15.8839 11.9502C15.7239 12.5742 15.7239 13.2302 15.8839 13.8382C15.2759 13.8382 14.6679 13.7582 14.0919 13.5982C12.2955 13.1973 10.6182 12.3808 9.19457 11.2142C8.75669 10.8708 8.35905 10.479 8.00924 10.0462C7.87427 9.91318 7.75113 9.76864 7.64124 9.61423C7.45403 9.94133 7.30888 10.2908 7.20924 10.6542C7.06 11.2924 7.06336 11.9568 7.21904 12.5934C7.37472 13.23 7.67834 13.8209 8.10524 14.3182C8.31324 14.5742 8.63324 14.7342 8.84124 14.9582C8.65883 14.9901 8.47124 14.9736 8.29724 14.9102C8.00648 14.8622 7.72204 14.7817 7.44924 14.6702L7.01724 14.5102C6.99291 15.2027 7.15536 15.8889 7.48754 16.497C7.81973 17.1051 8.30941 17.6125 8.90524 17.9662C9.28924 18.2542 9.73723 18.4302 10.2172 18.4942C9.96123 18.7182 8.82524 18.6222 8.42524 18.5742C8.82524 19.7902 9.76923 20.7342 10.9706 21.1502C11.3546 21.2942 11.7546 21.3582 12.1546 21.3582C11.8223 21.6368 11.4568 21.8732 11.0666 22.0622C10.3145 22.4726 9.50569 22.7692 8.66657 22.9422C8.29857 23.0222 7.91457 23.0062 7.49857 23.0702C7.07145 23.1022 6.6421 23.0861 6.21857 23.0222L6.57057 23.2302C6.93857 23.4542 7.30657 23.6462 7.70657 23.8062C8.47457 24.1262 9.25857 24.3822 10.0586 24.5742C11.9466 24.9742 13.9159 24.9102 15.7719 24.3822C19.9652 23.0702 22.6212 19.9982 23.6305 15.4702C23.7905 14.6222 23.8545 13.7422 23.8225 12.8782L24.4625 12.3502C24.9944 11.9012 25.4532 11.3722 25.8225 10.7822C25.1002 11.1014 24.3346 11.3117 23.5505 11.4062C23.7105 11.3262 23.8545 11.2142 23.9985 11.0862C24.6065 10.5902 25.0545 9.93423 25.2945 9.19823L24.7985 9.47023C24.1491 9.81562 23.4458 10.0483 22.7185 10.1582C22.3162 9.73122 21.8258 9.39695 21.2812 9.17867C20.7366 8.96039 20.1511 8.86333 19.5652 8.89423V8.91023H19.5479Z" fill="black" fill-opacity="0.1"/>
            </svg>

          </a>
            </div>
            <div class="col" style="text-align:center">
          <a class="btn btn-sm btn-icon btn-pill" href="https://twitter.com/neo_blockchain" rel="nofollow noopener" target="_blank" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.16429 0 0 7.16429 0 16C0 24.8357 7.16429 32 16 32C24.8357 32 32 24.8357 32 16C32 7.16429 24.8357 0 16 0ZM25.1429 9.06071L23.6857 10.4571C23.5571 10.5536 23.4964 10.7107 23.5214 10.8643V21.1393C23.4964 21.2964 23.5571 21.4536 23.6857 21.5464L25.1143 22.9429V23.2536H17.9429V22.9571L19.4179 21.525C19.5643 21.3786 19.5643 21.3357 19.5643 21.1179V12.8036L15.4571 23.2179H14.9036L10.125 12.8036V19.7857C10.0821 20.0786 10.1857 20.375 10.3929 20.5857L12.3143 22.9107V23.2214H6.85714V22.9107L8.77857 20.5857C8.98571 20.375 9.075 20.075 9.02857 19.7857V11.7143C9.05357 11.4893 8.96786 11.2714 8.79643 11.1179L7.08929 9.06071V8.75H12.3929L16.4857 17.7321L20.0893 8.75714H25.1429V9.06071Z" fill="black" fill-opacity="0.1"/>
            </svg>
          </a>
            </div>
          </div>
          <div class="row mt-2" >
            <div class="col" style="text-align:center">
          <a class="btn btn-sm btn-icon btn-pill " href="https://t.me/NEO_Chinese" rel="nofollow noopener" target="_blank" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.2322 23.3393L23.8572 10.9643C23.9643 10.4405 23.9018 10.0655 23.6697 9.83928C23.4375 9.61309 23.131 9.57143 22.75 9.71428L7.32144 15.6607C6.97619 15.7917 6.74106 15.9405 6.61606 16.1072C6.49106 16.2738 6.47619 16.4316 6.57144 16.5803C6.66669 16.7291 6.85716 16.8452 7.14284 16.9286L11.0893 18.1607L20.25 12.3928C20.5 12.2261 20.6905 12.1904 20.8214 12.2857C20.9048 12.3452 20.881 12.4345 20.75 12.5535L13.3393 19.25L13.0536 23.3214C13.3274 23.3214 13.5952 23.1905 13.8572 22.9286L15.7857 21.0714L19.7857 24.0178C20.5476 24.4464 21.0298 24.2202 21.2322 23.3393ZM32 16C32 18.1667 31.5774 20.2381 30.7322 22.2143C29.8869 24.1905 28.75 25.8929 27.3214 27.3214C25.8929 28.75 24.1905 29.8869 22.2143 30.7322C20.2381 31.5774 18.1667 32 16 32C13.8333 32 11.7619 31.5774 9.78572 30.7322C7.80953 29.8869 6.10715 28.75 4.67856 27.3214C3.24998 25.8929 2.11307 24.1905 1.26784 22.2143C0.422615 20.2381 0 18.1667 0 16C0 13.8333 0.422615 11.7619 1.26784 9.78572C2.11307 7.80953 3.24998 6.10715 4.67856 4.67856C6.10715 3.24998 7.80953 2.11307 9.78572 1.26784C11.7619 0.422615 13.8333 0 16 0C18.1667 0 20.2381 0.422615 22.2143 1.26784C24.1905 2.11307 25.8929 3.24998 27.3214 4.67856C28.75 6.10715 29.8869 7.80953 30.7322 9.78572C31.5774 11.7619 32 13.8333 32 16Z" fill="black" fill-opacity="0.1"/>
            </svg>
          </a>
            </div>
            <div class="col" style="text-align:center">
          <a class="btn btn-sm btn-icon btn-pill " href="https://weibo.com/neosmarteconomy" rel="nofollow noopener" target="_blank" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter">
            <svg   viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg"   width="32" height="32">
              <path d="M512 0C229.243259 0 0 229.224296 0 512s229.243259 512 512 512 512-229.224296 512-512S794.756741 0 512 0zM460.8 778.24c-175.312593 0-317.44-91.685926-317.44-204.781037 0-113.095111 212.859259-291.688296 294.286222-291.688296 34.133333 0 101.148444 25.448296 54.272 106.078815-3.280593 5.632 105.718519-46.895407 165.300148-12.344889 59.600593 34.550519 0 90.055111 0 96.218074 0 6.162963 119.656296 6.162963 119.656296 101.717333C776.874667 686.554074 636.112593 778.24 460.8 778.24zM710.276741 359.461926c-19.740444-23.438222-55.030519-17.957926-55.030519-17.957926-10.334815 0.094815-18.375111-7.111111-19.797333-16.839111-0.132741 0.986074-0.568889 1.896296-0.568889 2.901333l0-5.707852c0 1.005037 0.436148 1.85837 0.568889 2.806519 1.422222-9.993481 9.53837-18.792296 19.740444-20.138667 0 0 42.723556-11.681185 79.739259 21.636741 37.015704 33.317926 21.864296 88.405333 21.864296 88.405333-1.592889 11.207111-12.553481 20.15763-23.931259 20.15763L730.832593 434.725926c-11.396741 0-18.033778-8.779852-14.904889-19.607704C715.927704 415.099259 729.998222 382.900148 710.276741 359.461926zM850.62163 430.26963c-1.422222 15.587556-15.018667 28.273778-30.511407 30.01837 1.137778 0.132741 2.23763 0.341333 3.432296 0.341333l-6.97837 0c1.194667 0 2.37037-0.208593 3.546074-0.341333-15.018667-1.744593-25.125926-14.449778-22.945185-30.056296 0 0 16.70637-64.606815-23.988148-123.031704-40.713481-58.424889-128.208593-48.336593-128.208593-48.336593-15.54963-0.018963-28.596148-11.45363-30.245926-26.718815-0.113778 1.080889-0.32237 2.123852-0.32237 3.223704l0-6.409481c0 1.099852 0.208593 2.123852 0.32237 3.185778 1.649778-15.265185 14.506667-27.439407 30.340741-27.553185 0 0 91.098074-9.197037 158.947556 54.954667C871.860148 323.678815 850.62163 430.26963 850.62163 430.26963z" p-id="2465" fill="#E1E1E1">

              </path>
              <path d="M450.56 573.44m-20.48 0a1.08 1.08 0 1 0 40.96 0 1.08 1.08 0 1 0-40.96 0Z" p-id="2466" fill="#E1E1E1"></path><path d="M403.303951 640.642444a1.62 2.159 0 1 0-25.964544-55.683072 1.62 2.159 0 1 0 25.964544 55.683072Z" p-id="2467" fill="#E1E1E1"></path><path d="M432.033185 451.830519c-111.995259 15.739259-194.484148 87.514074-184.263111 160.331852 10.221037 72.817778 109.321481 119.087407 221.335704 103.329185 112.014222-15.739259 194.503111-87.514074 184.282074-160.331852C643.147852 482.360889 544.047407 436.091259 432.033185 451.830519zM448.398222 695.675259c-66.635852 12.951704-129.384296-21.560889-140.174222-77.065481-10.789926-55.523556 34.474667-111.009185 101.091556-123.960889 66.635852-12.970667 129.384296 21.541926 140.174222 77.065481C560.260741 627.218963 515.015111 682.723556 448.398222 695.675259z" p-id="2468" fill="#E1E1E1">
            </path>
            </svg>
          </a>
            </div>
            <div class="col" style="text-align:center">
          <a class="btn btn-sm btn-icon btn-pill " href="https://www.reddit.com/r/NEO/" rel="nofollow noopener" target="_blank" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter" >
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M625.737143 666.843429q9.142857 9.142857 0 17.700571-35.401143 35.401143-113.737143 35.401143t-113.737143-35.401143q-9.142857-8.557714 0-17.700571 3.437714-3.437714 8.557714-3.437714t8.557714 3.437714q27.428571 28.013714 96.548571 28.013714 68.534857 0 96.548571-28.013714 3.437714-3.437714 8.557714-3.437714t8.557714 3.437714zM450.267429 563.419429q0 21.138286-14.848 35.986286t-35.986286 14.848-36.278857-14.848-15.140571-35.986286q0-21.723429 15.140571-36.571429t36.278857-14.848 35.986286 15.140571 14.848 36.278857zM675.986286 563.419429q0 21.138286-15.140571 35.986286t-36.278857 14.848-35.986286-14.848-14.848-35.986286 14.848-36.278857 35.986286-15.140571 36.278857 14.848 15.140571 36.571429zM819.419429 494.884571q0-28.013714-19.968-47.981714t-48.566857-19.968-49.152 20.553143q-74.313143-51.419429-177.737143-54.857143l35.986286-161.718857 114.322286 25.746286q0 21.138286 14.848 35.986286t35.986286 14.848 36.278857-15.140571 15.140571-36.278857-15.140571-36.278857-36.278857-15.140571q-30.866286 0-45.714286 28.598857l-126.317714-28.013714q-10.825143-2.852571-14.262857 9.142857l-39.424 178.322286q-102.838857 4.022857-176.566857 55.442286-19.968-21.138286-49.737143-21.138286-28.598857 0-48.566857 19.968t-19.968 47.981714q0 19.968 10.605714 36.571429t28.306286 25.161143q-3.437714 15.433143-3.437714 32.036571 0 81.115429 80.018286 138.825143t192.585143 57.709714q113.152 0 193.170286-57.709714t80.018286-138.825143q0-18.285714-4.022857-32.548571 17.115429-8.557714 27.428571-24.868571t10.313143-36.278857zM1024 512q0 104.009143-40.594286 198.875429t-109.129143 163.401143-163.401143 109.129143-198.875429 40.594286-198.875429-40.594286-163.401143-109.129143-109.129143-163.401143-40.594286-198.875429 40.594286-198.875429 109.129143-163.401143 163.401143-109.129143 198.875429-40.594286 198.875429 40.594286 163.401143 109.129143 109.129143 163.401143 40.594286 198.875429z" p-id="4228" fill="#E1E1E1"></path></svg>
          </a>
            </div>
          </div>
        </div>
      </div>

      <div   style="width: 80%;margin-left: 10%;
      margin-bottom: 20px;
      font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 12px;

color: rgba(0, 0, 0, 0.7);">
        © 2021 neo. All rights reserved
      </div>
    </div>
  </div>

</template>
<script>
import axios from "axios";
import Neon from "@cityofzion/neon-js";

export default {
  name: "auth-layout",
  data() {
    return {
      searchVal: "",
      isHashPattern: /^((0x)?)([0-9a-f]{64})$/,
      isAssetPattern: /^((0x)?)([0-9a-f]{40})$/,
      isAddressPattern: /^N([0-9a-zA-Z]{33})$/,
      isNumberPattern: /^\d+$/,
      lang: "English 🇬🇧",
    };
  },
  created() {
    let lang = this.$i18n.locale;
    if (lang === "cn") {
      this.lang = "中文 " + "🇨🇳";
    } else if (lang === "en") {
      this.lang = "English " + "🇬🇧";
    } else if (lang === "fr") {
      this.lang = "Français " + "🇫🇷";
    }
  },
  methods: {
    // 语言切换
    switch_the_language(language) {
      this.$i18n.locale = language;
      if (language === "cn") {
        this.lang = "中文 " + "🇨🇳";
        localStorage.setItem('lang',"cn")
      } else if (language === "en") {
        this.lang = "English " + "🇬🇧";
        localStorage.setItem('lang',"en")
      } else if (language === "fr") {
        this.lang = "Français " + "🇫🇷";
        localStorage.setItem('lang',"fr")
      }
    },
    backHome() {
      this.$router.push({
        path: `/homepage`,
      });
    },
    search() {
      let value = this.searchVal;
      value = value.trim();
      this.searchVal = "";
      if (value === "") {
        return;
      } else if (this.isHashPattern.test(value)) {
        if (value.length === 64) {
          value = "0x" + value;
        }
        this.getTransactionByTransactionHash(value);
      } else if (this.isAssetPattern.test(value)) {
        if (value.length === 40) {
          value = "0x" + value;
        }

        this.getToken(value);
      } else if (Number(value[0]) >= 0) {
        value = value.replace(/[,，]/g, "");
        if (!isNaN(Number(value)) && this.isNumberPattern.test(value)) {
          if (Number.isInteger(Number(value))) {
            this.getBlockByBlockHeight(value);
          }
        } else {
          this.$router.push({
            path: `/search`,
          });
        }
      } else if (this.isAddressPattern.test(value)) {
        this.getAddressByAddress(this.addressToScriptHash(value));
      } else {
        this.$router.push({
          path: `/search`,
        });
      }
    },
    addressToScriptHash(addr) {
      try {
        const acc = Neon.create.account(addr);
        return "0x" + acc.scriptHash;
      } catch (err) {
        this.$router.push({
          path: `/search`,
        });
      }
    },
    getBlockByBlockHash(block_hash) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { BlockHash: block_hash },
          method: "GetBlockByBlockHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/blockinfo/${res["data"]["result"]["hash"]}`,
          });
        } else {
          this.$router.push({
            path: `/search`,
          });
        }
      });
    },
    getBlockByBlockHeight(blockheight) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { BlockHeight: parseInt(blockheight) },
          method: "GetBlockByBlockHeight",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/blockinfo/${res["data"]["result"]["hash"]}`,
          });
        } else {
          this.$router.push({
            path: `/search`,
          });
        }
      });
    },
    getAddressByAddress(addr) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetAddressByAddress",
          params: { Address: addr },
          id: 1,
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          crossDomain: "true",
        },
      }).then((res) => {
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/accountprofile/${addr}`,
          });
        } else {
          this.$router.push({
            path: `/search`,
          });
        }
      });
    },

    getToken(value) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash: value },
          method: "GetAssetInfoByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/tokeninfo/${value}`,
          });
        } else {
          this.getContractInfoByContractHash(value);
        }
      });
    },
    getContractInfoByContractHash(value) {
      return new Promise(() => {
        axios({
          method: "post",
          url: "/api",
          data: {
            jsonrpc: "2.0",
            id: 1,
            params: { ContractHash: value },
            method: "GetContractByContractHash",
          },
          headers: {
            "Content-Type": "application/json",
            withCredentials: " true",
            crossDomain: "true",
          },
        }).then((res) => {
          if (res["data"]["error"] == null) {
            this.$router.push({
              path: `/contractinfo/${value}`,
            });
          } else {
            this.getAddressByAddress(value);
          }
        });
      });
    },

    getTransactionByTransactionHash(value) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { TransactionHash: value },
          method: "GetRawTransactionByTransactionHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/transactionInfo/${value}`,
          });
        } else {
          this.getBlockByBlockHash(value);
        }
      });
    },
  },
};
</script>
<style>
.search-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 380px;
  background: #fff;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: #282828;
  margin-top: 36px;
  width: 100%;
}
.searchAuth {
  width: 80%;
  max-width: 565px;
  height: 50px;
  position: relative;
}
.buttonres {
  cursor: pointer;
  position: absolute;
  right: 1px;
  top: 1px;
  botton: 1px;
  width: 40px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: white !important;
  mix-blend-mode: normal;
  border-radius: 4px;
}

.img {
  width: 26px;
}

.over-ellipsis-Auth {
  width: 100%;
  height: 100%;
  padding-right: 15px;
  padding-left: 11px;
  font-size: 16px;
  background: rgba(255, 255, 255, 1);
  border: 0 !important;
  border-radius: 4px;
  color: black;
  outline-color: #000000;
}
.drop {
  width: 10%;
  margin-left: 1%;
}
.searchDiv {
  width: 25%;
  background: white;
  height: 35px;
  position: relative;
}
.btn-icon svg:hover path{
  fill:rgb(85,118,236);
  fill-opacity:1
}
.btn-icon {
  padding: 0rem 0rem!important;
  border-radius: 100% !important;
  border: 0px solid transparent!important;

}
  .footer-title{
    font-family: Inter,sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 17px;
    text-align: center;
    color: #000000;
    margin-bottom: 20px
  }

</style>
