(function () {

    async function search() {
        let username = document.getElementById("user_input").value;
        str = (username) => username.replace(/\s+/g, '').trim();
        const {
            login,
            followers_url: urlfollowers,
            repos_url: urlrepository,
            html_url: urlhtml,
            public_repos: publicRepository,
            followers: followers,
        } = await data('https://api.github.com/users/' + username);
        document.getElementById("username").innerHTML = login;
        fill_repo(urlrepository, "repo-info");
        fill_followers(urlfollowers, "followers-info");
    }
    async function data(url) {
        const res = await fetch(url);
        validResponse(res.status);
        return res.json();
    }

    function validResponse(status) {
        let notify = document.getElementById("alertBox");

        if (status >= 200 && status < 300) {
            document.getElementById("alertBox").classList.add('d-none');
            document.getElementById("demo-box").classList.remove('d-none');
            document.getElementById("saveButn").style.visibility = "visible";
            document.getElementById("deleteButn").style.visibility = "visible";
            return true;
        } else if (status === 404) {
            document.getElementById("alertBox").classList.remove('d-none');
            document.getElementById("demo-box").classList.add('d-none');
        }
        return false;
    }

    async function fill_repo(urlrepository, div_name) {

        var list_of_pairs = [];
        res = await data(urlrepository);
        for (i in res) {

            list_of_pairs.push([res[i].name, res[i].html_url]);

        }
        print_list(list_of_pairs, div_name)
    }

    function save_user() {


    }

    function delete_user() {

    }
    async function fill_followers(urlrepository, div_name) {

        var list_of_pairs = [];
        res = await data(urlrepository);
        for (i in res) {

            list_of_pairs.push([res[i].login, res[i].html_url]);

        }
        print_list(list_of_pairs, div_name)
    }



    function print_list(list_of_pairs, div_name) {
        var html = '';
        for (i in list_of_pairs) {
            html += `<li><a href="${list_of_pairs[i][1]}" target="_blank">${list_of_pairs[i][0]}</a></li>`;
        }
        console.log(div_name);
        document.getElementById(div_name).innerHTML = html;
    }

    validResponse(status);


    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById("searchButn").addEventListener("click", search);
        //these two function did not working so i deleted it
        document.getElementById("saveButn").addEventListener("click", save_user);

        document.getElementById("deleteButn").addEventListener("click", delete_user);

    }, false);

})();